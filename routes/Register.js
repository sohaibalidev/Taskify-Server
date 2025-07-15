const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { connectDB } = require('../config/mongo');

let db;

(async () => {
  db = await connectDB();
})();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) 
            return res.status(400).json({ message: 'Username and password are required' });

        if (!db) 
            return res.status(500).json({ message: 'Database not connected' });

        const users = db.collection('users');
        const existingUser = await users.findOne({ username });

        if (existingUser) 
            return res.status(409).json({ message: 'Username already exists' });  

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        await users.insertOne(newUser);

        return res.status(201).json({ message: 'User created successfully' });

    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router;