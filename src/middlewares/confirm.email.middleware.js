import jwt from "jsonwebtoken";
import env from "dotenv";
import { AppError, catchAsyncError } from "../utils/errors.handler.js";
import { successConfirmation } from "../services/nodemailer/emailTemplate.js";
env.config();

export const verifyAccount = (model) => {
    return catchAsyncError(async (req, res) => {
        const { emailToken } = req.params;
        jwt.verify(emailToken, process.env.EMAIL_TOKEN_KEY, async (error, decodedToken) => {
            if (error) throw new AppError("invalid token", 498);
            const { email } = decodedToken;
            const result = await model.findOneAndUpdate({ email }, { confirmed: true })
            if (!result) throw new AppError("failed to confirm your account", 400);
            res.status(200).send(successConfirmation)
        })
    })
}