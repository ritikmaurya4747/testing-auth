import { MongoClient } from "mongodb";

// Ensure the MONGODB_URI environment variable is set
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("⚠️ Missing MONGODB_URI in environment variables");
}

const client = new MongoClient(MONGODB_URI);
let isConnected = false; // Track if the database is already connected

export async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true; // Set to true after connecting
    console.log("✅ DB Connected Successfully");
  }
  return client.db("demo-testing");
}