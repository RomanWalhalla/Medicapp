import express from "express";
import appointmentModel from "../models/appointmentModel.js";
import validateRequest from "../middlewares/validateRequest.js";

// import patientModel from "../models/patientModel.js";
// import doctorModel from "../models/doctorModel.js";
// import dotenv from "dotenv"
// import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/appointments/register/:id //
router.post("/register/:userId", validateRequest, async (req, res) => {

    // console.log("req.body", req.body);
    const { date, doctorId } = req.body
    const { userId } = req.params

    // const foundDoctor = await findOne({doctorName})

    // console.log("Patient ID:", patientId);
    // console.log("Doctor ID:", doctorId);

    try {
        const appointment = new appointmentModel({ patientId: userId, doctorId, date/* , time  */ })
        await appointment.save()
        res.status(201).json(appointment)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// /api/appointments/user/:id //
router.get("/user/:userId", validateRequest, async (req, res) => {
    // console.log("/register/:userId");
    // console.log("req.body", req.params);
    // const { /* patientId, doctorID, */ date, doctorName, patientName, doctorId } = req.body
    const { userId } = req.params
    try {
        const foundAppointments = await appointmentModel.find({
            $or: [
                { patientId: userId }, // Ищем как пациента
                { doctorId: userId }   // Ищем как доктора
            ]
        }).populate("doctorId").populate("patientId"); // Используем populate для загрузки данных пациента и доктора
        // }).populate("patientId doctorId"); // Используем populate для загрузки данных пациента и доктора

        // console.log("Appointments without populate:", foundAppointments);

        if (!foundAppointments || foundAppointments.length === 0) {
            return res.status(400).json({ message: "Appointments not found" });
        }
        res.json(foundAppointments)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;