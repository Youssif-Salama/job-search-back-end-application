import mongoose from "mongoose";
import env from "dotenv";
env.config()

export const dbConnection = mongoose.connect(process.env.DB_HOST + process.env.DB_NAME)