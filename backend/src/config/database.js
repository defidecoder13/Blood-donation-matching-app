const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodlink');

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create geospatial indexes
    const db = conn.connection.db;
    await db.collection('donors').createIndex({ location: '2dsphere' });
    await db.collection('requests').createIndex({ location: '2dsphere' });

    console.log('Geospatial indexes created');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;