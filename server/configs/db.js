import mongoose from "mongoose";
import config from "./config.js";

let cachedConnection = null;

export const connectDB = async () => {
  if (cachedConnection) return cachedConnection;

  // If no connection URL, don't even try
  if (!config.db.url) {
    throw new Error("MongoDB URL is missing from Environment Variables");
  }

  try {
    // Standard Mongoose connection for serverless
    cachedConnection = await mongoose.connect(config.db.url, {
      bufferCommands: false, // Disable buffering so it fails fast instead of hanging
    });
    console.log("New DB connection established");
    return cachedConnection;
  } catch (error) {
    console.error(`DB connection error: ${error.message}`);
    throw error;
  }
};
