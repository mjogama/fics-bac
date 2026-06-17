import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db_uri: string = process.env.MONGO_URI_DEV || "";

export const connectDB = async () => {
  if (!db_uri) {
    throw new Error("MongoDB URI is missing. Set MONGO_URI_PROD or MONGO_URI_DEV.");
  }

  await mongoose.connect(db_uri);

  if (mongoose.connection.readyState !== 1) {
    throw new Error("MongoDB failed to reach a connected state.");
  }

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  console.log(`Database connected successfully (${mongoose.connection.name})`);
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected.");
};
