import env from "dotenv";
env.config();
import { v2 as cloudinary } from 'cloudinary';
import { catchAsyncError, AppError } from "../../utils/errors.handler.js";
import { applicationModel } from "../../modules/models/application.model.js";

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

export const uploadResume = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        throw new AppError("No file uploaded", 400);
    }

    const resumeData = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
    if (!resumeData) {
        throw new AppError("Failed to upload resume on cloud", 400);
    } else {
        const { asset_id, secure_url, original_filename } = resumeData;
        req.body.userResume = {
            resumeTitle: original_filename,
            resumePath: secure_url,
            asset_id
        }
        req.body.userId = req.decodedToken._id;

        next();
    }
});

export const removeResume = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    const { userResume } = await applicationModel.findOne({ _id: id });
    await cloudinary.uploader.destroy(userResume.asset_id);
    next();
})
