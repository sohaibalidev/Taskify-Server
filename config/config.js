module.exports = {
    PORT: process.env.PORT || 5000,
    FRONT_END_URL: process.env.FRONT_END_URL || 'http://192.168.100.4:3000',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET || 'jwt-secret',
    NODE_ENV: process.env.NODE_ENV || 'development'
}