import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { validate } from "../validations/validateDocument.validation.js";
import { addCompanySchema, updateCompanySchema, updateEmailCompanySchema } from "../validations/company.validations.js";
import { attachAddQuery, attachDeleteQuery, attachGetQuery, attachUpdateQuery } from "../../middlewares/query.middleware.js";
import { companyModel } from "../models/company.model.js";
import { companyExecute, sendConfirmationEmailOnUpdate } from "../controllers/company.controllers.js";
import { verifyAccount } from "../../middlewares/confirm.email.middleware.js";
import { execute } from "../../middlewares/execute.middleware.js";
import { filterQuery, pagination, populate, search } from "../../middlewares/features.middleware.js";
import { addCompanyHr, checkCompanyHr } from "../middlewares/company.middlewares.js";

const companyRouter = Router();

companyRouter.post("/",
    authentication,
    authorization("COMPANY_HR"),
    validate(addCompanySchema),
    addCompanyHr,
    attachAddQuery(companyModel),
    companyExecute
);

companyRouter.get("/verify/:emailToken", verifyAccount(companyModel));
companyRouter.get("/", attachGetQuery(companyModel), pagination(), search, populate("companyHr"), execute(200, false));

companyRouter.put("/:companySlug",
    authentication,
    authorization("COMPANY_HR"),
    validate(updateCompanySchema),
    attachUpdateQuery(companyModel),
    checkCompanyHr,
    filterQuery({ fieldName: "slug", paramName: "companySlug" }),
    execute(200, false));

companyRouter.delete("/:companySlug",
    authentication,
    authorization("COMPANY_HR"),
    attachDeleteQuery(companyModel),
    checkCompanyHr,
    filterQuery({ fieldName: "slug", paramName: "companySlug" }),
    execute(200, false));

companyRouter.put("/email/:companySlug",
    authentication,
    authorization("COMPANY_HR"),
    validate(updateEmailCompanySchema),
    attachUpdateQuery(companyModel),
    checkCompanyHr,
    filterQuery({ fieldName: "slug", paramName: "companySlug" }),
    execute(200, true),
    sendConfirmationEmailOnUpdate
);

export { companyRouter }