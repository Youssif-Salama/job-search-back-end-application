import mongoose from "mongoose"


const contractSchema = new mongoose.Schema({
    Name: {
        type: String,
        minlength: [3, "يجب اللا يقل الاسم عن ثلاثه احرف"],
        maxlength: [25, "يجب اللا يزيد الاسم عن 25 حرف"],
        required: true
    },
    Role: {
        type: String,
        enum: ["lessor", "tenant"],
        required: true
    },
    Email: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true
    },
    AgentEmail: {
        type: String,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    AgentPhone: {
        type: String,
        required: true
    },
    AdditionalPhone: {
        type: String,
    },
    AgentAdditionalPhone: {
        type: String,
    },
    Agent: {
        type: String,
        minlength: [3, "يجب اللا يقل اسم العميل عن ثلاثه احرف"],
        maxlength: [25, "يجب اللا يزيد اسم العميل عن 25 حرف"],
        required: true
    },
    TaxNumber: {
        type: String,
        required: true
    },
    IdNumber: {
        type: String,
        required: true
    },
    AgentIdNumber: {
        type: String,
        required: true
    },
    ContractNumber: {
        type: String,
        required: true
    },
    Notes: {
        type: String,
        maxlength: [500, "يجب اللا يزيد الاسم عن 500 حرف"],
    },
    More: {
        type: String,
        maxlength: [500, "يجب اللا يزيد الاسم عن 500 حرف"],
    },
    ContractRegisteredOn: {
        type: String,
        required: true
    },
    TotalPrice: {
        type: String,
        required: true
    },
    PaymentWay: {
        type: String,
        enum: ["1", "3", "6", "12"],
        required: true
    },
    Times: {
        type: String,
        required: true
    },
    FileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    AddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    ReleaseDate: {
        type: Date,
        required: true
    },
    DueDate: {
        type: Date,
    }
}, { timestamps: true })


export const contractModel = mongoose.model("Contract", contractSchema);