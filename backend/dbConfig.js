import { MongoClient } from "mongodb";

const Uri = "mongodb://localhost:27017/";

export const client = new MongoClient(Uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB (Compass/Local)");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}
