import mongoose from "mongoose";
const { Schema } = mongoose;

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    technicalSkills: [{
        type: String,
        required: true
    }],
    softSkills: [{
        type: String,
        required: true
    }],
    userResume:
    {
        resumeTitle: {
            type: String,
            required: true
        },
        resumePath: {
            type: String,
            required: true
        },
        asset_id: {
            type: String,
            required: true
        }
    }

}, { timestamps: true });

const applicationModel = mongoose.model("Application", applicationSchema);
export { applicationModel };
