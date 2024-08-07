import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    City: {
        type: String,
        minlength: [2, "يجب اللا يقل ايم المدينه عن حرفان"],
        maxlength: [25, "يجب اللا يزيد ايم المدينه عن 25 حرف"],
        required:true
    },
    Town: {
        type: String,
        minlength: [2, "يجب اللا يقل ايم البلده عن حرفان"],
        maxlength: [25, "يجب اللا يزيد ايم البلده عن 25 حرف"],
        required:true
    },
    Neighborhood: {
        type: String,
        minlength: [2, "يجب اللا يقل ايم البلده عن حرفان"],
        maxlength: [30, "يجب اللا يزيد ايم البلده عن 30 حرف"],
        required:true
    },
    Street: {
        type: String,
        minlength: [2, "يجب اللا يقل ايم الشارع عن حرفان"],
        maxlength: [30, "يجب اللا يزيد ايم الشارع عن 30 حرف"],
        required:true
    },
    PostalCode: {
        type: String,
        required:true
    },
    BuildingNumber: {
        type: String,
        required:true
    },
    AdditionalBuildingNumber: {
        type: String,
    }
}, { timestamps: true })


export const addressModel = mongoose.model("Address", addressSchema)