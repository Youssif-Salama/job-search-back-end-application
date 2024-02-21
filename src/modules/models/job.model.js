import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        enum: ['onsite', 'remotely', 'hybrid'],
        required: true
    },
    workingTime: {
        type: String,
        enum: ['part-time', 'full-time', 'freelance', 'volunteering'],
        required: true
    },
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required: true
    },
    jobDescription: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000
    },
    technicalSkills: [{
        type: String,
        required: true
    }],
    softSkills: [{
        type: String,
        required: true
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    expiryDate: {
        type: String,
        match: /^([0-9]{4})(\/|-)(1[0-2]|0?[1-9])\2(3[01]|[12][0-9]|0?[1-9])$/
    }
}, { timestamps: true });


jobSchema.pre(/find/i, function (next) {
    this.populate("addedBy", ["fullName", "address", "skills", "phone", "email"]);
    next();
})
export const jobModel = mongoose.model("Job", jobSchema);
