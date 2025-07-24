"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const storage_util_1 = require("../../common/utils/storage.util");
const doctors_entity_1 = require("../../shared/entities/doctors.entity");
const typeorm_2 = require("typeorm");
let FileService = class FileService {
    storageService;
    doctorRepo;
    constructor(storageService, doctorRepo) {
        this.storageService = storageService;
        this.doctorRepo = doctorRepo;
    }
    async updateDoctorClincFiles(doctorId, files, keepFiles) {
        const doctor = await this.doctorRepo.findOneBy({ id: +doctorId });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor profile not found");
        doctor.clinc = doctor.clinc || {};
        doctor.clinc.imgs = doctor.clinc.imgs || [];
        if ((!keepFiles || keepFiles.length === 0) && (!files || files.length === 0)) {
            throw new common_1.BadRequestException("You must upload at least one file or provide old files to keep");
        }
        if ((!keepFiles || keepFiles.length === 0) && files && files.length > 0) {
            const oldPublicIds = doctor.clinc.imgs.map(img => img.public_id);
            const replacedFiles = await this.storageService.replaceFiles(oldPublicIds, "doctors/clinc", files);
            if (!replacedFiles || replacedFiles.length === 0)
                throw new common_1.BadRequestException("Files upload failed, please try again");
            doctor.clinc.imgs = replacedFiles;
        }
        else {
            const filesToDelete = doctor.clinc.imgs.filter(img => !keepFiles.some(file => file.public_id === img.public_id));
            const publicIdsToDelete = filesToDelete.map(file => file.public_id);
            console.log({ publicIdsToDelete });
            if (publicIdsToDelete.length > 0) {
                const deletedFiles = await this.storageService.destroyFiles(publicIdsToDelete, "doctors/clinc");
                if (!deletedFiles)
                    throw new common_1.BadRequestException("Failed to delete old files, please try again");
            }
            if (keepFiles.length + (files?.length || 0) > 10) {
                throw new common_1.BadRequestException("You cannot have more than 10 clinic images");
            }
            let uploadedFiles = [];
            if (files && files.length > 0) {
                uploadedFiles = await this.storageService.uploadFiles(files, "doctors/clinc");
                if (!uploadedFiles || uploadedFiles.length === 0) {
                    throw new common_1.BadRequestException("Files upload failed, please try again");
                }
            }
            const mergedImgs = [
                ...keepFiles,
                ...uploadedFiles.filter(up => !keepFiles.some(kf => kf.public_id === up.public_id))
            ];
            doctor.clinc.imgs = mergedImgs;
        }
        const savedDoctor = await this.doctorRepo.save(doctor);
        if (!savedDoctor)
            throw new common_1.BadRequestException("Failed to save your profile clinc files");
        return { files: doctor.clinc.imgs };
    }
    async updateDoctorAuthFiles(doctorId, files) {
        const doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        const doctorAuthFiles = doctor.auth || {};
        const filesToUpdate = {};
        const publicIdsList = [];
        if (files.card?.length) {
            filesToUpdate['card'] = files.card[0];
            if (doctorAuthFiles.card?.public_id)
                publicIdsList.push(doctorAuthFiles.card.public_id);
        }
        if (files.fid?.length) {
            filesToUpdate['fid'] = files.fid[0];
            if (doctorAuthFiles.id?.fid?.public_id)
                publicIdsList.push(doctorAuthFiles.id.fid.public_id);
        }
        if (files.sid?.length) {
            filesToUpdate['sid'] = files.sid[0];
            if (doctorAuthFiles.id?.sid?.public_id)
                publicIdsList.push(doctorAuthFiles.id.sid.public_id);
        }
        if (Object.keys(filesToUpdate).length === 0) {
            throw new common_1.BadRequestException('You must upload at least one file');
        }
        const replacedFiles = await this.storageService.replaceFiles(publicIdsList, "doctors/auth", Object.values(filesToUpdate));
        if (!replacedFiles || replacedFiles.length === 0) {
            throw new common_1.BadRequestException(['File upload failed, please try again']);
        }
        const newAuth = {
            card: filesToUpdate['card']
                ? replacedFiles.find(f => f.public_id && f.public_id.includes('card'))
                : doctorAuthFiles.card,
            id: {
                fid: filesToUpdate['fid']
                    ? replacedFiles.find(f => f.public_id && f.public_id.includes('fid'))
                    : doctorAuthFiles.id?.fid,
                sid: filesToUpdate['sid']
                    ? replacedFiles.find(f => f.public_id && f.public_id.includes('sid'))
                    : doctorAuthFiles.id?.sid,
            }
        };
        const updateMyDoctorFiles = await this.doctorRepo.update(doctor.id, {
            auth: newAuth,
            isActive: false
        });
        if (!updateMyDoctorFiles || updateMyDoctorFiles.affected === 0) {
            throw new common_1.BadRequestException(['Failed to update your profile files, please try again later']);
        }
        return { files: newAuth };
    }
    async createDoctorAuthFiles(doctorId, files) {
        const doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException('Doctor profile not found');
        }
        if (!files.card?.length || !files.fid?.length || !files.sid?.length) {
            throw new common_1.BadRequestException(['You must upload all three files: card and identification front and back']);
        }
        const filesObjs = [
            files.card[0],
            files.fid[0],
            files.sid[0]
        ];
        const uploadedFiles = await this.storageService.uploadFiles(filesObjs, "doctors/auth");
        if (!uploadedFiles || uploadedFiles.length === 0) {
            throw new common_1.BadRequestException(['File upload failed, please try again']);
        }
        const doctorFiles = {
            card: uploadedFiles.find(file => file.public_id && file.public_id.includes('card')) || doctor.auth?.card,
            id: {
                fid: uploadedFiles.find(file => file.public_id && file.public_id.includes('fid')) || doctor.auth?.id?.fid,
                sid: uploadedFiles.find(file => file.public_id && file.public_id.includes('sid')) || doctor.auth?.id?.sid
            }
        };
        if (!doctorFiles.card || !doctorFiles.id.fid || !doctorFiles.id.sid) {
            throw new common_1.BadRequestException('All auth files must be provided');
        }
        doctor.auth = doctorFiles;
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new common_1.BadRequestException(['Failed to update your profile files, please try again later']);
        }
        return { files: doctorFiles };
    }
    async updateDoctorProfileImg(doctorId, file) {
        if (!doctorId)
            throw new common_1.BadRequestException('User not authenticated');
        const doctor = await this.doctorRepo.findOneBy({ id: doctorId });
        if (!doctor)
            throw new common_1.NotFoundException('Doctor profile not found');
        if (!file)
            throw new common_1.BadRequestException('You must upload your profile img');
        const { img } = doctor;
        const replacedFiles = await this.storageService.replaceFiles([img?.public_id], "doctors/img", [file]);
        if (!replacedFiles || !replacedFiles[0].public_id)
            throw new common_1.BadRequestException('File upload failed, please try again');
        doctor.img = {
            public_id: replacedFiles[0].public_id,
            url: replacedFiles[0].url
        };
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor)
            throw new common_1.BadRequestException('Failed to update your profile image, please try again later');
        return { img: doctor.img };
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(doctors_entity_1.DoctorEntity)),
    __metadata("design:paramtypes", [storage_util_1.StorageUtilService,
        typeorm_2.Repository])
], FileService);
//# sourceMappingURL=file.service.js.map