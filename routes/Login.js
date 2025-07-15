const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const { connectDB } = require('../config/mongo');
const router = express.Router();

let db;

(async () => {
    db = await connectDB();
})();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = db.collection('users');
        const user = await users.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ username: user.username }, config.JWT_SECRET, { expiresIn: '30d' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
