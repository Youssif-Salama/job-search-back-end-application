import { Router } from "express"
import { deleteDocumentData, getDocumentData, login, resetPassword, senReqToResetPassword, signup, updateDocumentData, updatePassword } from "../controllers/user.controllers.js";
import { authentication } from "../middlewares/authentication.middleware.js";
import { validate } from "../validations/validateDocument.validation.js";
import { loginSchema, resetPasswordSchema, signupSchema, updatePasswordSchema, updateSchema } from "../validations/user.validations.js";
import { verifyAccount } from "../../middlewares/confirm.email.middleware.js";
import { userModel } from "../models/user.model.js";

const userRouter = Router();
userRouter.post("/signup", validate(signupSchema), signup)
userRouter.post("/login", validate(loginSchema), login)
userRouter.post("/reset/password", validate(resetPasswordSchema), senReqToResetPassword)
userRouter.get("/", authentication, getDocumentData)
userRouter.get("/verify/:emailToken", verifyAccount(userModel))
userRouter.get("/reset/password/:resetPasswordToken", resetPassword)
userRouter.put("/", authentication, validate(updateSchema), updateDocumentData)
userRouter.put("/password", authentication, validate(updatePasswordSchema), updatePassword)
userRouter.delete("/", authentication, deleteDocumentData)
export { userRouter }

