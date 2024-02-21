import jwt from "jsonwebtoken";
import env from "dotenv"
env.config();
import { successConfirmation } from "../../services/nodemailer/emailTemplate.js";
import { sendMailToConfirmCompany } from "../../services/nodemailer/nodemailer.js";
import { AppError, catchAsyncError } from "../../utils/errors.handler.js";
import { companyModel } from "../models/company.model.js";
import { userModel } from "../models/user.model.js";

export const companyExecute = catchAsyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const { email } = req.body;
    const result = await req.dbQuery;
    if (!result) throw new AppError("failed to add document", 400);
    await userModel.findOneAndUpdate({ _id }, { company: true });
    sendMailToConfirmCompany(email)
    res.json(201, { message: "success, check mail for confirmation", result });
})


export const sendConfirmationEmailOnUpdate = async (req, res) => {
    const { email } = req.body;
    await companyModel.findOneAndUpdate({ email }, { confirmed: false });
    sendMailToConfirmCompany(email);
}

