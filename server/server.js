// import express from 'express';
// import path from 'path';
import chalk from "chalk"
import express from "express"
import authRoutes from './routes/auth.js'
import path from "path"
import { __dirname } from "./utils/utils.js"

// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth');

// require('dotenv').config();

// const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.error(err));

app.use(express.json());

app.use('/api/auth', authRoutes);


app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/api/hello', (req, res) => {
//     res.send({ message: 'Hello from the server!'});
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    // console.log("%c Server", "color:white; background color: yellow", `Server is running on port ${PORT}`);
    // console.log(chalk.red.bold(`Server is running on port ${PORT}`));
    console.log(chalk.red.bold("Server is running on port ") + chalk.cyan.bold(PORT));
});