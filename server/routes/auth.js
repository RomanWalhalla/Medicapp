const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, phone, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const existingPhone = await phone.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            phone,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expires: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;