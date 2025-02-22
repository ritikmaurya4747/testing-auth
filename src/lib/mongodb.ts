import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// ✅ Ensure MONGODB_URI is set
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("⚠️ Missing MONGODB_URI in environment variables");
}

// ✅ Mongoose Connection
await mongoose.connect(MONGODB_URI, {
  dbName: "demo-testing",
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,
});
console.log("✅ Mongoose Connected Successfully");

// ✅ MongoClient Connection
const client = new MongoClient(MONGODB_URI);
let isConnected = false; // Track if the database is already connected

export async function connectToDatabase() {
  if (isConnected) {
    console.log("✅ MongoClient Already Connected");
    return client.db("demo-testing");
  }

  try {
    await client.connect();
    isConnected = true;
    console.log("✅ MongoClient Connected Successfully");
    return client.db("demo-testing");
  } catch (error) {
    console.error("❌ MongoClient Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
