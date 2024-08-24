import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import chalk from "chalk";
import dotenv from "dotenv"
import { check, validationResult } from "express-validator";

dotenv.config();

const secret = process.env.JWT_SECRET

const router = express.Router();

// /api/auth/register //
router.post(
    "/register", [
    check("name", "Name must be at least 3 characters and no more than 15 characters").isLength({ min: 3, max: 15 }),
    check("email", "Email is not correct").isEmail({ min: 4, max: 25 }),
    check("phone", "Phone is not correct").isMobilePhone()/* .isLength({ min: 6, max: 15 }) */,
    check("password", "Password must be at least 6 characters and no more than 15 characters").isLength({ min: 6, max: 15 })],
    async (req, res) => {
        try {
            const { name, phone, email, password } = req.body;
            // console.log(chalk.red("Body:", JSON.stringify(req.body)))

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Data is not correct"
                })
            }

            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email already in use" });
            }

            const existingPhone = await userModel.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({ message: "Phone already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                name,
                phone,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            res.status(201).json({
                message: "User is Created"
            });
        } catch (err) {
            console.log(chalk.bold.bgRed.underline("Registration error") + " " + err)
            res.status(500).json({ message: "Server error" });
        }
    });

// module.exports = router;

// /api/auth/login //
router.post(
    "/login",
    [
        check("email", "Enter the correct Email").normalizeEmail().isEmail(),
        check("password", "Enter the correct password").exists()
    ],
    async (req, res) => {
        try {
            const { email, password } = req.body;
            const userFound = await userModel.findOne({ email });
            // const userPhone = await userModel.findOne({ phone });
            if (!userFound /* || !userPhone */) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const isValidPassword = await bcrypt.compare(password, userFound._doc.password);
            if (!isValidPassword) {
                return res.status(404).json({
                    message: "Login or password no is correct",
                });
            }

            const token = jwt.sign(
                { userId: userFound._id, },
                secret,
                { expiresIn: "1h" }
            )

            res.json({
                userId: userFound._id,
                userName: userFound.name,
                token,
                // ...userFound._doc,
            })
            // res.json({
            //     ...userFound,
            //     // ...userFound._doc,
            //     token,
            // })

        } catch (err) {
            console.log(chalk.bold.bgRed.underline("Registration error") + " " + err)
            res.status(500).json({
                message: "You couldn't Login",
            })
        }
    });


export default router;
