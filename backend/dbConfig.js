// import { MongoClient } from "mongodb";

// const Uri = "mongodb+srv://ABM:AbMajeed1@projectcluster.jbxprft.mongodb.net/?retryWrites=true&w=majority&appName=ProjectCluster";

// export const client = new MongoClient(Uri);

// export async function connectDB() {
//   try {
//     await client.connect();
//     console.log("✅ Connected to MongoDB (Compass/Local)");
//   } catch (err) {
//     console.error("❌ Database connection failed:", err.message);
//     process.exit(1);
//   }
// }

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb://ABM:AbMajeed1@ac-u4xcsm7-shard-00-00.jbxprft.mongodb.net:27017,ac-u4xcsm7-shard-00-01.jbxprft.mongodb.net:27017,ac-u4xcsm7-shard-00-02.jbxprft.mongodb.net:27017/?ssl=true&replicaSet=atlas-w6zpxj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ProjectCluster";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});