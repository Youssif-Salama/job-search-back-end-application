// middleware to check if the current user is the owner of the company

import { AppError, catchAsyncError } from "../../utils/errors.handler.js";
import { companyModel } from "../models/company.model.js";

export const addCompanyHr = (req, res, next) => {
    req.body.companyHr = req.decodedToken._id;
    next();
}

export const checkCompanyHr = catchAsyncError(async (req, res, next) => {
    const { _id } = req.decodedToken;
    const result = await companyModel.findOne({ companyHr: _id });
    if (!result) throw new AppError("only company owner can modify", 400);
    next();
})