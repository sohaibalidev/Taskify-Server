// ================ Environment Setup ================
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config')

// ================ Initialize App ================
const app = express();
const PORT = config.PORT;

// ================ Database Configuration ================
const { connectDB } = require('./config/mongo');

// ================ Route Imports ================
const LoginRoute = require('./routes/Login');
const RegisterRoute = require('./routes/Register');
const TodoRoute = require('./routes/Todo');

// ================ Middleware ================
app.use(cors({
    origin: config.FRONT_END_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ================ Routes ================
app.use('/api', LoginRoute);
app.use('/api', RegisterRoute);
app.use('/api', TodoRoute);

app.get('/', (req, res) => {
    const uptime = process.uptime().toFixed(1);
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    const statusReport = [ 
        '==========================================',
        '  Wrikos API Service — Status Report',
        '==========================================',
        '',
        `Status     : 200 OK`,
        `Uptime     : ${uptime}s`,
        `Timestamp  : ${timestamp}`,
        `Message    : Server is running properly`,
        '',
        '=========================================='
    ].join('\n');

    res.set('Content-Type', 'text/plain; charset=utf-8')
        .status(200)
        .send(statusReport);
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// ================ Error Handling ================
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// ================ Server Startup ================
(async () => {
    await connectDB()
        .then(console.log('Connected To MongoDB'))
})().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Server startup failed:', err);
});