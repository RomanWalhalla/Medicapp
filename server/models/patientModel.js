import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'patient',
        required: true,
    },
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
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
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
    medicalCharacteristics: {
        bloodType: {
            type: String,
        },
        allergies: {
            type: String,
        },
    },
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema, 'patients');
