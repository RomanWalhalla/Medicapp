import express from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import doctorModel from "../models/doctorModel.js";
import chalk from "chalk";
import dotenv from "dotenv"
import { check, validationResult } from "express-validator";
import verifyToken from "../middlewares/verifyToken.js"

import { promisify } from 'util';
import mongoose from "mongoose";
import validateUserId from "../middlewares/validateUserId.js";
import { log } from "console";

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET
const refreshSecret = process.env.JWT_REFRESH_SECRET

const router = express.Router();

const findUserByEmail = async (email) => {
    const patient = await patientModel.findOne({ email })
    const doctor = await doctorModel.findOne({ email })
    return patient || doctor
}
const findUserById = async (_id) => {
    const patient = await patientModel.findOne({ _id })
    const doctor = await doctorModel.findOne({ _id })
    return patient || doctor
}
const logout = async (email) => {
    const patient = await patientModel.findOne({ email })
    const doctor = await doctorModel.findOne({ email })
    return patient || doctor
}

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "Invalid input data" });
    }
    next()
}

// /api/auth/register //
router.post(
    "/register", [
    check("firstName", "Name must be at least 3 characters and no more than 15 characters").isLength({ min: 3, max: 15 }),
    check("email", "Email is not correct").isEmail({ min: 4, max: 25 }),
    check("phoneNumber", "Phone is not correct").isMobilePhone().isLength({ min: 6, max: 15 }),
    check("password", "Password must be at least 6 characters and no more than 15 characters").isLength({ min: 6, max: 15 })],
    validateRequest,
    async (req, res) => {
        try {
            const { role, firstName, phoneNumber, email, password, lastName, age, gender, address, medicalCharacteristics } = req.body;
            const userExists = await findUserByEmail(email);
            if (userExists) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                role,
                firstName,
                // lastName,
                phoneNumber,
                email,
                password: hashedPassword,
                // age,
                // gender,
                address: {
                    country: address.country,
                    cityState: address.cityState,
                    streetName: address.streetName,
                    postalCode: address.postalCode,
                },
                medicalCharacteristics: {
                    bloodType: medicalCharacteristics?.bloodType || "",
                    allergies: medicalCharacteristics?.allergies || "",
                }
            };

            if (role === 'doctor') {
                await doctorModel.create(newUser);  // Сохранение доктора
            } else if (role === 'patient') {
                await patientModel.create(newUser);  // Сохранение пациента
            } else {
                return res.status(400).json({ message: "Invalid role provided" });
            }

            // await newUser.save();

            res.status(201).json({
                newUser: newUser,
                message: "User is Created"
            });

        } catch (err) {
            console.log(chalk.bold.bgRed.underline("Registration error") + " " + err)
            res.status(500).json({ message: "Server error" });
        }
    });

// /api/auth/login //
router.post(
    "/login",
    [
        check("email", "Enter the correct Email").normalizeEmail().isEmail(),
        check("password", "Enter the correct password").exists()
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const userFound = await findUserByEmail(email);
            if (!userFound) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isValidPassword = await bcrypt.compare(password, userFound._doc.password);
            if (!isValidPassword) {
                return res.status(404).json({ message: "Incorrect email or password", });
            }

            const accessToken = jwt.sign(
                { userId: userFound._id },
                accessSecret,
                { expiresIn: "1h" }
            )

            const refreshToken = jwt.sign(
                { userId: userFound._id },
                refreshSecret,
                { expiresIn: "7d" }
            )

            const userModel = userFound.role === "doctor" ? doctorModel : patientModel
            await userModel.findByIdAndUpdate(userFound._id, { refreshToken });

            res.json({
                userId: userFound._id,
                firstName: userFound.firstName,
                phoneNumber: userFound.phoneNumber,
                email: userFound.email,
                accessToken,
                refreshToken,
            })
        } catch (error) {
            console.log(chalk.bold.bgRed.underline("Registration error") + " " + error)
            res.status(500).json({ message: "Server error" });
        }
    });

// /api/auth/logout //
router.post("/logout", async (req, res) => {
    try {
        const userFound = await logout(email);
        if (!userFound) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const userModel = patientFound ? patientModel : doctorModel;
        await userModel.findOneAndUpdate({ refreshToken }, { refreshToken: null });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
})

// /api/auth/user/:id //
router.get("/user/:userId", validateUserId, async (req, res) => {
    try {
        const { userId } = req.params;
        const userFound = await findUserById(userId);
        if (!userFound) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(userFound)

    } catch (error) {
        console.error("/api/auth/user/:id/error", error);
        res.status(500).json({ success: false, message: "Server error" })
    }
})

// /api/auth/refreshToken //
router.post("/api/auth/refreshToken", verifyToken, async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        return res.status(403).json({ success: false, message: "Refresh token not provided" });
    }
    try {
        const decoded = jwt.verify(refreshToken, refreshSecret)
        const newAccessToken = jwt.sign({ userId: decoded.userId }, accessSecret, { expiresIn: "1h" })

        req.accessToken = newAccessToken
        req.userId = decoded.userId
        // next()
    } catch (error) {
        return res.status(403).json({ success: false, message: "Invalid refresh token" });
    }
})

// /api/auth/updateProfile/:userId //
router.put("/updateProfile/:userId", verifyToken, validateUserId, async (req, res) => {
    try {
        const { userId } = req.params
        const { ...updateData } = req.body

        const patientFound = await patientModel.findById(userId);
        const doctorFound = await doctorModel.findById(userId);
        if (!patientFound && !doctorFound) {
            return res.status(404).json({ success: false, message: "/updateProfile/:userId - User not found" });
        }

        const userModel = patientFound ? patientModel : doctorModel;
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true })

        res.status(200).json({ success: true, data: updatedUser })

    } catch (error) {
        console.log("Error when updating data:", error);
        res.status(500).json({ success: false, message: "Error when update a data" })
    }
})

// /api/auth/searchDoctors/:userId //
router.get("/searchDoctors/:userId", async (req, res) => {

    // console.log("req.query", req.query);

    // const { userId } = req.params
    const { firstName, speciality } = req.query

    // console.log("speciality", speciality);

    let query = {}

    if (firstName) {
        query.firstName = { $regex: firstName, $options: "i" }
    }

    if (speciality) {
        query.speciality = { $regex: speciality, $options: "i" }
    }
    try {
        // console.log("Query", query);
        // const collection = db.collection("doctors")
        // const doctors = await doctorModel.find(query).toArray()
        const doctors = await doctorModel.find(query).exec()
        // console.log("Found doctors:", doctors);
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        res.json(doctors)
    } catch (error) {
        res.status(500).json({ message: "Error to find doctors - /searchDoctors/:userId", error })
    }
})

export default router;



// const errors = validationResult(req)
// if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array(), message: "Data is not correct" })
// }

// const existingDoctor = await doctorModel.findOne({ email });
// const existingPatient = await patientModel.findOne({ email });

// if (existingDoctor || existingPatient) {
//     return res.status(400).json({ message: "Email already in use" });
// }

// const existingPhone = await userModel.findOne({ phone });
// if (existingPhone) {
//     return res.status(400).json({ success: false, message: "Phone already in use" });
// }



// const userId = req.params.id
// // if (!userId) {
// //     return res.status(403).json({ message: "Unauthorized access" });
// // }

// if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: "Invalid user ID format" });
// }


// /api/auth/doctors //
// router.get("/doctors", verifyToken, async (req, res) => {
//     try {
//         const userId = req.params.id
//         if (!userId) {
//             return res.status(403).json({ message: "Unauthorized access" });
//         }

//         const userFound = await userModel.findById(userId)
//         if (!userFound) {
//             return res.status(404).json({ message: "User not found" })
//         }

//         res.json(userFound)
//     } catch (error) {
//         console.error("/api/auth/user/:id/error", error);
//         res.status(500).json({ success: false, message: "Server error" })
//     }
// })

// // /api/auth/token //
// router.post("/token", verifyToken, validateUserId, async (req, res) => {
//     const verifyAsync = promisify(jwt.verify);
//     const { refreshToken } = req.body
//     if (!refreshToken) { return res.status(401).json({ success: false, message: "No refreshToken provided" }) }


//     try {
//         const decoded = await verifyAsync(refreshToken, refreshSecret);
//         const accessToken = jwt.sign(
//             { userId: decoded.userId },
//             accessSecret,
//             { expiresIn: "1h" }
//         )
//         res.json({ accessToken })
//     } catch (error) {
//         console.error("Token verification error:", error);
//         return res.status(403).json({ message: "Invalid refreshToken" });
//     }
// })

// /api/auth/logout //