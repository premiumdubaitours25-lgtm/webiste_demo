import mongoose from 'mongoose';

// Don't throw error, return null if no URI (for demo mode)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

async function connectDB() {
  // Read MONGODB_URI dynamically each time to get latest env vars
  const MONGODB_URI = process.env.MONGODB_URI;
  
  // Debug: Log if URI is found (without exposing the actual URI)
  if (MONGODB_URI) {
    console.log('MONGODB_URI found, attempting connection...');
  } else {
    console.warn('MONGODB_URI not defined. Running in demo mode with sample data.');
    cached.isConnected = false;
    return null;
  }

  // If URI changed, reset cached connection
  if (cached.conn && cached.lastUri !== MONGODB_URI) {
    console.log('MONGODB_URI changed, resetting connection...');
    cached.conn = null;
    cached.promise = null;
  }
  cached.lastUri = MONGODB_URI;

  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    cached.isConnected = true;
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      cached.isConnected = true;
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection failed, using demo mode:', error.message);
      cached.isConnected = false;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn) {
      cached.isConnected = true;
    } else {
      cached.isConnected = false;
    }
  } catch (e) {
    console.error('MongoDB connection error, using demo mode:', e.message);
    cached.promise = null;
    cached.isConnected = false;
    cached.conn = null;
  }

  return cached.conn;
}

export const isConnected = () => cached.isConnected;
export default connectDB;
