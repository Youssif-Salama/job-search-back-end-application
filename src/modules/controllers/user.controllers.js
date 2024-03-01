import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
import { AppError, catchAsyncError } from "../../utils/errors.handler.js";
import { userModel } from "../models/user.model.js";
import { sendMail, sendMailToResetPassword } from "../../services/nodemailer/nodemailer.js";
import { successConfirmation, successResetPasswordConfirmation } from "../../services/nodemailer/emailTemplate.js";



/*
what u need in signup process 
if(user already exist) error("user already exist")
else
1- hashing password 
2-create user  document 
3-send him email to confirm
*/

export const signup = catchAsyncError(async (req, res) => {
    const { password, email } = req.body;

    const checkIfUserExist = await userModel.findOne({ email });
    if (checkIfUserExist) throw new AppError("user already exist", 400);

    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
    const result = await userModel.create({ ...req.body, password: hashedPassword });
    if (!result) throw new AppError("failed to signup", 400);
    sendMail(email)
    res.json(201, { message: "signed up successfully, check your mail" })
})

/*
    1-check if user exist if yes continue if no error
    2- if yes make token
*/
export const login = catchAsyncError(async (req, res) => {
    const { email, phone } = req.body;
    const result = await userModel.findOne({ $or: [{ email }, { phone }] });
    if (!result) throw new AppError("User does not exist, please sign up", 400);
    const { email: userEmail, phone: phoneNum, _id, fullName, role } = result;
    const userToken = jwt.sign({ userEmail, phoneNum, _id, fullName, role }, process.env.TOKEN_KEY, { expiresIn: "2hr" });
    result.loggedIn = true;
    await result.save();
    res.status(200).json({ message: "Success", token: userToken });
});


export const getDocumentData = catchAsyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const result = await userModel.findById(_id);
    if (!result) throw new AppError("cannot find user ", 400);
    res.json(200, { message: "success", result })
})

export const updateDocumentData = catchAsyncError(async (req, res) => {
    const { email, phone, firstName, lastName, DateOB, role, skills, address } = req.body;

    const { _id } = req.decodedToken;
    const existingUser = await userModel.findOne({ $or: [{ email }, { phone }], _id: { $ne: _id } });
    if (existingUser) throw new AppError("Email or phone number is already in use by another user", 400);

    const result = await userModel.findByIdAndUpdate(_id, { address, skills, email, phone, firstName, lastName, DateOB, role }, { new: true })
    if (!result) throw new AppError("failed to update user");

    if (email) {
        result.confirmed = false;
        await result.save();
        sendMail(email)
    }

    res.json(200, { message: "success", result })
})

export const deleteDocumentData = catchAsyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const result = await userModel.deleteOne({ _id });
    if (!result) throw new AppError("failed to delete your account", 400);
    res.json(200, { message: success });
})

// update password 
/*
    1- user must be authenticated
    2- hashing the ne password and update doc
*/

export const updatePassword = catchAsyncError(async (req, res) => {
    const { _id } = req.decodedToken;
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
    const result = await userModel.findOneAndUpdate({ _id }, { password: hashedPassword, loggedIn: false }, { new: true })
    if (!result) throw new AppError("failed to update password", 400);
    res.json(200, { message: "success", result })
})


// reset password
export const senReqToResetPassword = catchAsyncError(async (req, res) => {
    /*
        i need your email to search u in db if yes=> send email else=>stop
    */

    const { email, password } = req.body;
    const result = await userModel.findOne({ email });
    if (!result) throw new AppError("failed to find user", 400);
    sendMailToResetPassword(email, password)
    res.json(200, { message: "check your email" })
})


export const resetPassword = catchAsyncError(async (req, res) => {
    const { resetPasswordToken } = req.params;
    jwt.verify(resetPasswordToken, process.env.EMAIL_TOKEN_KEY, async (error, decodedToken) => {
        if (error) throw new AppError("invalid token", 498);
        const { email, password } = decodedToken;
        const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
        const result = await userModel.findOneAndUpdate({ email }, { password: hashedPassword })
        if (!result) throw new AppError("failed to confirm your account", 400);
        res.status(200).send(successResetPasswordConfirmation)
    })
})
