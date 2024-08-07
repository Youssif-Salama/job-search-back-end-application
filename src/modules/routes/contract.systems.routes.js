import { Router } from "express";
import { getContractSystemsByPriority } from "../controllers/contract.system.controller.js";

const contractSystemsRouter = Router();
contractSystemsRouter.get("/", getContractSystemsByPriority)
export { contractSystemsRouter }