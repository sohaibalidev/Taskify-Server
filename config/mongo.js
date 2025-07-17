const { MongoClient } = require('mongodb');
const config = require('../config/config')

let db = null;
let client = null;

async function connectDB() {
    if (db) return db;

    client = new MongoClient(config.MONGO_URI);
    try {
        await client.connect();
        db = client.db(`${config.DB_NAME}`);

        return db;
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}

module.exports = { connectDB };
