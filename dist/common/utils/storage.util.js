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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUtilService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_util_1 = require("./cloudinary.util");
const streamifier = require("streamifier");
let StorageUtilService = class StorageUtilService {
    cloudinaryService;
    cloudinaryStorageClient;
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
        this.cloudinaryStorageClient = this.cloudinaryService.getCloudinaryClient();
    }
    sanitizeFilename(name) {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-\.]/g, '')
            .substring(0, 50);
    }
    makeCloudinaryStream(bucket, public_id, resource_type) {
        return {
            streamUploader: (buffer) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = this.cloudinaryStorageClient.uploader.upload_stream({ folder: bucket, resource_type, public_id }, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(result);
                        }
                    });
                    streamifier.createReadStream(buffer).pipe(uploadStream);
                });
            },
        };
    }
    generatePublicId(bucket, originalname, fieldname) {
        const randomWord = [...Array(4)]
            .map(() => "abcdefghijklmnopqrstuvwxyz1234567890".charAt(Math.floor(Math.random() * 36)))
            .join("");
        const safeName = this.sanitizeFilename(originalname);
        return `${bucket}-${fieldname}-${safeName}-drs-${randomWord}-drs-${new Date().getFullYear()}/${new Date().getMonth() + 1}`;
    }
    async uploadFile(fileObj, bucket) {
        const mimetype = fileObj.mimetype.split("/")[0];
        const { fieldname, originalname, buffer } = fileObj;
        const generatedPublicId = this.generatePublicId(bucket, originalname, fieldname);
        const uploader = this.makeCloudinaryStream(bucket, generatedPublicId, mimetype);
        const uploadFileResult = await uploader.streamUploader(buffer);
        console.log({
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        });
        return {
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        };
    }
    async uploadFiles(filesObjs, bucket) {
        const uploads = filesObjs.map(fileObj => this.uploadFile(fileObj, bucket));
        const uploadedFiles = await Promise.all(uploads);
        if (uploadedFiles.length === 0) {
            throw new Error("No files to upload");
        }
        if (uploadedFiles.length < filesObjs.length) {
            const successUploadedFilesPublicIdsList = uploadedFiles.filter(upload => upload && upload.public_id);
            if (successUploadedFilesPublicIdsList.length > 0) {
                await this.destroyFiles(successUploadedFilesPublicIdsList.map(file => file.public_id), bucket);
            }
            throw new Error("Some files failed to upload");
        }
        return uploadedFiles;
    }
    async destroyFiles(publicIdList, bucket) {
        if (!publicIdList || publicIdList.length === 0) {
            throw new Error("Public ID list is empty. Bad usage of destroyFiles method!");
        }
        const results = await Promise.allSettled(publicIdList.map(publicId => this.cloudinaryStorageClient.uploader.destroy(publicId)));
        return results.map((result, idx) => ({
            public_id: publicIdList[idx],
            success: result.status === 'fulfilled',
            ...(result.status === 'fulfilled' ? { result: result.value } : { error: result.reason }),
        }));
    }
    async replaceFiles(publicIdList, bucket, files) {
        (publicIdList && publicIdList?.length > 0) && await this.destroyFiles(publicIdList, bucket);
        return await this.uploadFiles(files, bucket);
    }
};
exports.StorageUtilService = StorageUtilService;
exports.StorageUtilService = StorageUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_util_1.CloudinaryBaseUtilService])
], StorageUtilService);
//# sourceMappingURL=storage.util.js.map