import nodemailer from "nodemailer";
import env from "dotenv"
import jwt from "jsonwebtoken";
import { companyEmailTemplate, emailTemplate, resetTemplate } from "./emailTemplate.js";
env.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async (email) => {
    const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN_KEY)
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirm your account on JURO",
        text: "WELCOME TO JURO APP",
        html: emailTemplate(emailToken)
    });
}

export const sendMailToConfirmCompany = async (email) => {
    const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN_KEY)
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirm your account on JURO",
        text: "WELCOME TO JURO APP",
        html: companyEmailTemplate(emailToken)
    });
}

export const sendMailToResetPassword = async (email, password) => {
    const resetPasswordToken = jwt.sign({ email, password }, process.env.EMAIL_TOKEN_KEY)
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        text: "WELCOME TO JURO APP",
        html: resetTemplate(resetPasswordToken)
    });
}