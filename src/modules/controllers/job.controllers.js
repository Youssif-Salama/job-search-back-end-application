import { AppError, catchAsyncError } from "../../utils/errors.handler.js";
import { companyModel } from "../models/company.model.js";
import { jobModel } from "../models/job.model.js";

export const attachAddedById = catchAsyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    req.result.addedBy = _id;
    await req.result.save();
    res.json(201, { message: "success", ...req.result._doc })
})

// export const getAllJobsOfSpecificCompany = catchAsyncError(async (req, res) => {
//     const { companyName } = req.params;
//     const { companyHr } = await companyModel.findOne({ companyName });
//     if (!companyHr) throw new AppError("cannot find company !", 400);
//     const result = await jobModel.find({ addedBy: companyHr });
//     if (!result) throw new AppError("cannot find any job", 400);
//     res.json(200, result);
// })


export const getAllJobsOfSpecificCompany = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const jobs1 = await jobModel.findOne({ addedBy: id });
    if (jobs1) res.json(200, { message: "success", jobs1 });
    const { companyHr } = await companyModel.findOne({ _id: id });
    if (!companyHr) throw new AppError("cannot find company", 400);
    const jobs2 = await jobModel.findOne({ addedBy: companyHr });
    res.json(200,{message:"success",jobs2});
})