import { Router } from "express";
import { contractRouter } from "../modules/routes/contract.routes.js";
import { contractSystemsRouter } from "../modules/routes/contract.systems.routes.js";

const v1Router = Router();


v1Router.use("/contract", contractRouter)
v1Router.use("/contract-systems", contractSystemsRouter)

export { v1Router }