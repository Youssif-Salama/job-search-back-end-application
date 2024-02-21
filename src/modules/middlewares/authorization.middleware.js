import { AppError, catchAsyncError } from "../../utils/errors.handler.js";

export const authorization = (actorRole) => {
    return catchAsyncError((req, res, next) => {
        const { role } = req.decodedToken;
        if (role === actorRole) next();
        else throw new AppError("forbidden", 403)
    })
}