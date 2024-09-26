import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import path from 'path';
import mongoose from 'mongoose';

// import util from "util";
const __dirname = import.meta.dirname;

const app = express();

// Middleware //
app.use(express.json({ extended: true }));
app.use(cors());
// Routes //
app.use('/api/auth', authRoutes);

app.use('/api/appointments', appointmentsRoutes);


app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log(chalk.bgGreenBright.bold.underline('MongoDB connected')))
            .catch((err) => console.log(chalk.bgRed.bold.underline('DB error') + err));

        app.listen(PORT, () => {
            // console.log("%c Server", "color:white; background color: yellow", `Server is running on port ${PORT}`);
            console.log(chalk.red.bold('Server is running on port ') + chalk.cyan.bold.underline(PORT)
            );
        });
    } catch (error) {
        console.log(chalk.bgRed('Server Error', error.message));
        process.exit(1);
    }
}
start();











// app.post("/auth/register", registerValidation, async (req, res) => {
//     // console.log(chalk.blue.bold("req.body"), util.inspect(req.body, { showHidden: false, depth: null, colors: true }))
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json(errors.array());
//         }

//         const password = req.body.password;
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);

//         const doc = new userModel({
//             name: req.body.name,
//             phone: req.body.phone,
//             email: req.body.email,
//             password: hash,
//         })

//         const user = await doc.save();

//         const token = jwt.sign(
//             { _id: user._id, },
//             "secret123",
//             { expiresIn: "1h" }
//         )

//         const { passwordHash, ...userData } = user._doc

//         res.json({
//             ...userData,
//             token,
//         })
//     } catch (err) {
//         console.log(chalk.bold.bgRed.underline("Registration error") + " " + err)
//         res.status(500).json({
//             message: "You couldn't register",
//         })
//     }
// });