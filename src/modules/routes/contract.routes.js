import { Router } from "express";
import { addContract, deleteContract, updateContract, updateContractAddress, updateContractFiles } from "../controllers/contract.controllers.js";
import { upload } from "../../services/multer/multer.service.js";
import { attachGetQuery } from "../../middelwares/Attach.Query.js";
import { contractModel } from "../models/contract.model.js";
import { filterQuery, pagination, search, sort } from "../../middelwares/Features.middleware.js";
import { execute } from "../../middelwares/Execution.js";
import { contractSystemModel } from "../models/contract.system.model.js";


const contractRouter = Router();

contractRouter.post("/", upload.array("Files"), addContract);
contractRouter.delete("/:id", deleteContract);
contractRouter.put("/:id", updateContract);
contractRouter.put("/files/:id", upload.array("Files"), updateContractFiles);
contractRouter.put("/address/:id", updateContractAddress);
contractRouter.get("/", attachGetQuery(contractModel), search(), sort(), pagination(10), execute(
    {
        status: 200,
        result: {
            message: "تم"
        }
    },
    {
        status: 400,
        result: {
            message: "فشل"
        }
    }
));
contractRouter.get("/:id", attachGetQuery(contractModel), filterQuery({ fieldName: "_id", paramName: "id" }), execute(
    {
        status: 200,
        result: {
            message: "تم"
        }
    },
    {
        status: 400,
        result: {
            message: "فشل"
        }
    }
));
contractRouter.get("/search", attachGetQuery(contractModel), filterQuery({ fieldName: "_id", paramName: "id" }), execute(
    {
        status: 200,
        result: {
            message: "تم"
        }
    },
    {
        status: 400,
        result: {
            message: "فشل"
        }
    }
));

contractRouter.get("/:id/systems", attachGetQuery(contractSystemModel), filterQuery({ fieldName: "ContractId", paramName: "id" }), pagination(10), sort(), execute(
    {
        status: 200,
        result: {
            message: "تم"
        }
    },
    {
        status: 400,
        result: {
            message: "فشل"
        }
    }
))

export { contractRouter }