import { AppError, catchAsyncError } from "../utils/errors.handler.js";

export const execute = (status, con = false) => {
    return catchAsyncError(async (req, res, next) => {
        const result = await req.dbQuery;
        if (!result) throw new AppError("failed to add document", 400);
        con ? (req.result = result, next()) : (res.json(status || 200, { message: "success", result }))
    })
}