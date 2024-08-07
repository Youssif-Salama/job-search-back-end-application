import jwt from "jsonwebtoken";
import env from "dotenv";
import { AppError, CatchAsyncErrors } from "../../utils/Error.Handeler.js";
env.config();


export const authentication = CatchAsyncErrors(async (req, res, next) => {
    const token = req.header("token");
    if (!token) throw new AppError(401, "unauthorized");
    await jwt.verify(token, process.env.Token_Key, (error, decodedToken) => {
        // if (error) throw new AppError(498, "invalid token");
        if (error) res.json(498,"invalid token");
        req.decodedToken = decodedToken;
        next();
    })
})




export const authorization = (actorRole) => {
    return CatchAsyncErrors((req, res, next) => {
        if (typeof actorRole == "string") {
            const { Role } = req.decodedToken;
            if (Role === actorRole) next();
            else throw new AppError(403, "forbidden")
        }
        else {
            const { Role } = req.decodedToken;
            if (Role === actorRole[0] || Role === actorRole[1]) next();
            else throw new AppError(403, "forbidden")
        }
    })
}
