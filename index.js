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
    res.status(200).send('[Taskify] Server Running Properly')
})

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// ================ Error Handling ================
app.use((req, res) => {
    res.status(404).send('404 Not Found' );
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