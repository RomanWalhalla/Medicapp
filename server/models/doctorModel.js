import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "doctor",
        required: true,
    },
    speciality: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
    address: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        streetName: {
            type: String,
        },
        postalCode: {
            type: String,
        },
    },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema, 'doctors');
