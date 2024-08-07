import { CatchAsyncErrors } from "../../utils/Error.Handeler.js";
import { contractSystemModel } from "../models/contract.system.model.js";

export const getContractSystemsByPriority = CatchAsyncErrors(async (req, res) => {
    const todayDate = new Date();
    const dueDateThreshold = new Date(todayDate.getTime() + 10 * 24 * 60 * 60 * 1000);

    const contractSystems = await contractSystemModel.find({
        DueDate: { $lte: dueDateThreshold }
    }).sort({ DueDate: 1 });

    res.status(200).json({
        status: "تم",
        data: [
            contractSystems
        ]
    });
});