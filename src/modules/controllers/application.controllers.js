import { AppError, catchAsyncError } from "../../utils/errors.handler.js";
import { applicationModel } from "../models/application.model.js";
import { jobModel } from "../models/job.model.js";

export const applyToJob = catchAsyncError(async (req, res) => {
    const { jobId } = req.body;
    const job = await jobModel.findOne({ _id: jobId });
    if (!job) throw new AppError("failed to find job", 400);
    const result = await applicationModel.create(req.body);
    if (!result) throw new AppError("failed to apply job", 400);
    res.json(201, { message: "success", result })
})


export const deleteMyApplications = catchAsyncError(async (req, res) => {
    const _id = req.decodedToken;
    const result = await applicationModel.findOneAndDelete({ userId: _id });
    if (!result) throw new AppError("no application found", 400);
    res.json(200, { message: "success" });
})

export const deleteMyApplication = catchAsyncError(async (req, res) => {
    const applicationId = req.params.id
    const _id = req.decodedToken;
    const result = await applicationModel.findOneAndDelete({ userId: _id, _id: applicationId });
    if (!result) throw new AppError("no application found", 400);
    res.json(200, { message: "success" });
})

export const getMyApplications = catchAsyncError(async (req, res) => {
    const result = await applicationModel.find({ userId: req.decodedToken._id });
    if (!result) throw new AppError("no application found", 400);
    res.json(200, { message: "success", result })
})

export const getApplicationsRelatedToSpecificJob = catchAsyncError(async (req, res) => {
    const { jobId } = req.params;
    const applications = await applicationModel.find({ jobId });
    if (!applications) throw new AppError("failed to fin applications", 400);
    res.json(200, { message: "success", applications });
})