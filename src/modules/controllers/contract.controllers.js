import { AppError, CatchAsyncErrors } from "../../utils/Error.Handeler.js";
import { addressModel } from "../models/addrerss.model.js";
import { contractModel } from "../models/contract.model.js";
import { fileModel } from "../models/file.model.js";

export const addContract = CatchAsyncErrors(async (req, res) => {
    const {
        City,
        Town,
        Neighborhood,
        Street,
        PostalCode,
        BuildingNumber,
        AdditionalBuildingNumber = null,
        Times,
        PaymentWay,
        TotalPrice,
        ContractRegisteredOn,
        More,
        Notes,
        ContractNumber,
        IdNumber,
        TaxNumber,
        Agent,
        AdditionalPhone = null,
        Phone,
        Email,
        Role,
        Name
    } = req.body;

    let FileId = null;
    let AddressId = null;

    if (req.files) {
        let temp = [];
        req.files.forEach(file => {
            temp.push(`/public/files/` + file.filename)
        });
        const file = await fileModel.create({ Files: temp });
        if (!file) throw new AppError("خظأ في تخزين الملفات", 400);
        FileId = file._id;
    }
    const address = await addressModel.create({
        City,
        Town,
        Neighborhood,
        Street,
        PostalCode,
        BuildingNumber,
        AdditionalBuildingNumber
    });
    if (!address) throw new AppError("خظأ في تخزين العنوان", 400);
    AddressId = address._id;

    const contract = await contractModel.create({
        Times,
        PaymentWay,
        TotalPrice,
        ContractRegisteredOn,
        More,
        Notes,
        ContractNumber,
        IdNumber,
        TaxNumber,
        Agent,
        AdditionalPhone,
        Phone,
        Email,
        Role,
        Name,
        FileId,
        AddressId
    });

    if (!contract) throw new AppError("خظأ في تخزين العقد", 400);

    res.status(201).json({
        status: "success",
        message: "تم اضافة العقد بنجاح",
        contractId: contract._id
    })

})


export const deleteContract = CatchAsyncErrors(async (req, res) => {
    const contract = await contractModel.findById(req.params.id);
    if (!contract) throw new AppError("العقد غير موجود", 404);
    await fileModel.findByIdAndDelete(contract.FileId);
    await addressModel.findByIdAndDelete(contract.AddressId);

    const deleteContract = await contractModel.findByIdAndDelete(req.params.id);
    if (!deleteContract) throw new AppError("خظأ في حذف العقد", 400);
    res.status(200).json({
        status: "success",
        message: "تم حذف العقد ومتعلقاته بنجاح"
    })
})


export const updateContractFiles = CatchAsyncErrors(async (req, res) => {
    const contract = await contractModel.findById(req.params.id);
    if (!contract) throw new AppError("العقد غير موجود", 404);
    if (!req.files) throw new AppError("الملفات غير موجودة", 404);
    let tempFiles = [];
    if (req.files) {
        req.files.forEach(file => {
            tempFiles.push(`/public/files/` + file.filename)
        })
    }
    if (req.body.FixedFiles) {
        let tempFixedFiles = JSON.parse(req.body.FixedFiles);
        tempFixedFiles.forEach(file => {
            tempFiles.push(file)
        })
    }
    const updateFiles = await fileModel.findByIdAndUpdate(contract.FileId, { Files: tempFiles });
    if (!updateFiles) throw new AppError("خظأ في تخزين الملفات", 400);

    res.status(200).json({
        status: "success",
        message: "تم تحديث الملفات بنجاح"
    });
})

export const updateContractAddress = CatchAsyncErrors(async (req, res) => {
    const contract = await contractModel.findById(req.params.id);
    if (!contract) throw new AppError("العقد غير موجود", 404);
    const {
        City,
        Town,
        Neighborhood,
        Street,
        PostalCode,
        BuildingNumber,
        AdditionalBuildingNumber
    } = req.body;

    const updateAddress = await addressModel.findByIdAndUpdate(contract.AddressId, {
        City,
        Town,
        Neighborhood,
        Street,
        PostalCode,
        BuildingNumber,
        AdditionalBuildingNumber
    });
    if (!updateAddress) throw new AppError("خظأ في تخزين العنوان", 400);

    res.status(200).json({
        status: "success",
        message: "تم تحديث العنوان بنجاح"
    });
})


export const updateContract = CatchAsyncErrors(async (req, res) => {
    const contract = await contractModel.findById(req.params.id);
    if (!contract) throw new AppError("العقد غير موجود", 404);
    const {
        Times,
        PaymentWay,
        TotalPrice,
        ContractRegisteredOn,
        More,
        Notes,
        ContractNumber,
        IdNumber,
        TaxNumber,
        Agent,
        AdditionalPhone,
        Phone,
        Email,
        Role,
        Name
    } = req.body;

    const updateContract = await contractModel.findByIdAndUpdate(req.params.id, {
        Times,
        PaymentWay,
        TotalPrice,
        ContractRegisteredOn,
        More,
        Notes,
        ContractNumber,
        IdNumber,
        TaxNumber,
        Agent,
        AdditionalPhone,
        Phone,
        Email,
        Role,
        Name
    });
    if (!updateContract) throw new AppError("خظأ في تخزين العقد", 400);

    res.status(200).json({
        status: "success",
        message: "تم تحديث العقد بنجاح"
    });
})