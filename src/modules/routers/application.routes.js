import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { applyToJob, deleteMyApplication, deleteMyApplications, getApplicationsRelatedToSpecificJob, getMyApplications } from "../controllers/application.controllers.js";
import { upload } from "../../services/multer/multer.js";
import { removeResume, uploadResume } from "../../services/cloudinary/cloudinary.js";
import { validate } from "../validations/validateDocument.validation.js";
import { applySchema } from "../validations/application.validation.js";
const applicationRouter = Router({ mergeParams: true });

applicationRouter.post("/",
    authentication,
    authorization("USER"),
    upload.single("resume"),
    uploadResume,
    validate(applySchema),
    applyToJob)

applicationRouter.get("/myApplications",
    authentication,
    authorization("USER"),
    getMyApplications)

applicationRouter.get("/specificApplications/:jobId",
    authentication,
    authorization("COMPANY_HR"),
    getApplicationsRelatedToSpecificJob)

applicationRouter.delete("/",
    authentication,
    authorization("USER"),
    deleteMyApplications)

applicationRouter.delete("/:id",
    authentication,
    authorization("USER"),
    removeResume,
    deleteMyApplication
)

export { applicationRouter }