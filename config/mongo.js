const { MongoClient } = require('mongodb');
const config = require('../config/config')

const MONGO_URI = config.MONGO_URI;
const DB_NAME = config.DB_NAME;

let db = null;
let client = null;

async function connectDB() {
    if (db) return db;

    client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        db = client.db(DB_NAME);

        return db;
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}

module.exports = { connectDB };
