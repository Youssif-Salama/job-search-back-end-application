import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { validate } from "../validations/validateDocument.validation.js";
import { addJobSchema, updateJobSchema } from "../validations/job.validations.js";
import { attachAddQuery, attachDeleteQuery, attachGetQuery, attachUpdateQuery } from "../../middlewares/query.middleware.js";
import { execute } from "../../middlewares/execute.middleware.js";
import { jobModel } from "../models/job.model.js";
import { attachAddedById, getAllJobsOfSpecificCompany } from "../controllers/job.controllers.js";
import { filter, filterQuery, pagination, search, sort } from "../../middlewares/features.middleware.js";
import { applicationRouter } from "./application.routes.js";

const jobRouter = Router();
jobRouter.use("/application", applicationRouter)
jobRouter.post("/",
    authentication,
    authorization("COMPANY_HR"),
    validate(addJobSchema),
    attachAddQuery(jobModel),
    execute(201, true),
    attachAddedById);

jobRouter.route("/:id").put(
    authentication,
    authorization("COMPANY_HR"),
    validate(updateJobSchema),
    attachUpdateQuery(jobModel),
    filterQuery({ fieldName: "_id", paramName: "id" }),
    execute(200))
    .delete(
        authentication,
        authorization("COMPANY_HR"),
        validate(updateJobSchema),
        attachDeleteQuery(jobModel),
        filterQuery({ fieldName: "_id", paramName: "id" }),
        execute(200))

jobRouter.get("/", attachGetQuery(jobModel), pagination(), filter, sort, search, execute(200));
jobRouter.get("/:id", getAllJobsOfSpecificCompany)
export { jobRouter }