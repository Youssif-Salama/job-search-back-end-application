import { Router } from "express";
import { contractRouter } from "../modules/routes/contract.routes.js";

const v1Router = Router();


v1Router.use("/contract", contractRouter)

export { v1Router }