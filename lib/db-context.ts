// /lib/dbConnect.js
import mongoose from 'mongoose';

async function dbConnect (mongoUri: string) {

  if (!mongoUri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
      )
    }
  
  let cached = (global as any).mongoose;
  
  if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
  }
  
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {

    cached.promise = mongoose.connect(mongoUri).then(mongoose => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect