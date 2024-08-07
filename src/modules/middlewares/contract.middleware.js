import { AppError } from "../../utils/Error.Handeler.js";
import { addressModel } from "../models/addrerss.model.js";
import { contractModel } from "../models/contract.model.js";
import { contractSystemModel } from "../models/contract.system.model.js";
import { fileModel } from "../models/file.model.js";

export const addContractSystem = async (TotalPrice, Times, PaymentWay, ReleaseDate, ContractId) => {
    // first step is to count rentValue
    let RentValue = TotalPrice / Times;


    let releaseDate = new Date(ReleaseDate);
    for (let i = 0; i < Times; i++) {
        let dueDate = new Date(releaseDate);
        // i need => renew rd , dd
        if (PaymentWay == "1") {
            dueDate.setMonth(dueDate.getMonth() + 1);
        }
        if (PaymentWay == "3") {
            dueDate.setMonth(dueDate.getMonth() + 3);
        }
        if (PaymentWay == "6") {
            dueDate.setMonth(dueDate.getMonth() + 6);
        }
        if (PaymentWay == "12") {
            dueDate.setMonth(dueDate.getMonth() + 12);
        }

        try {
            await contractSystemModel.create({ ContractId, ReleaseDate: releaseDate, DueDate: dueDate, RentValue: RentValue.toString() });
        } catch (error) {
            const contract = await contractModel.findById(ContractId)
            await fileModel.findByIdAndDelete(contract.FileId);
            await addressModel.findByIdAndDelete(contract.AddressId);
            await contractModel.findByIdAndDelete(ContractId);
            throw new AppError(400, "خطأ ف تخزين الدفعات")
        }

        releaseDate = dueDate;
    }
}