import { Router } from "express";
import { userRouter } from "../modules/routers/user.routes.js";
import { companyRouter } from "../modules/routers/company.routes.js";
import { jobRouter } from "../modules/routers/job.routes.js";
import { applicationRouter } from "../modules/routers/application.routes.js";

const v1Router = Router();
v1Router.use("/user/", userRouter);
v1Router.use("/company/", companyRouter);
v1Router.use("/job/", jobRouter);
v1Router.use("/application/", applicationRouter);

export { v1Router };
