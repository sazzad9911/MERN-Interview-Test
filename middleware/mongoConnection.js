import mongoose from "mongoose";
import { drawings } from "../schema/models.js";
export const mongoConnection = async () => {
  try {
    
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export const Drawings = mongoose.model("drawings", drawings);
