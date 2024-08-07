import mongoose from "mongoose";

const contractSystemSchema = new mongoose.Schema({
    ReleaseDate: {
        type: Date,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    RentValue: {
        type: String,
        required: true
    },
    ServiceValue: {
        type: String,
        default: "0"
    },
    ContractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    }
}, { timestamps: true })


export const contractSystemModel = mongoose.model("ContractSystem", contractSystemSchema)