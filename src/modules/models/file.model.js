import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    Files: [
        {
            type: String,
            required:true
        }
    ]
}, { timestamps: true })


export const fileModel = mongoose.model("File", fileSchema)