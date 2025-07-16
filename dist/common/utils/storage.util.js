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
        let randomWord = "";
        const digitsArr = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
        const loops = 4;
        for (let i = 0; i < loops; i++) {
            const randomIndex = Math.floor(Math.random() * digitsArr.length);
            randomWord += digitsArr[randomIndex];
        }
        return (bucket +
            "-" +
            fieldname +
            "-" +
            originalname +
            "-drs-" +
            randomWord +
            "-drs-" +
            new Date().getFullYear() +
            "/" +
            (new Date().getMonth() + 1));
    }
    async uploadFile(fileObj, bucket) {
        const { fieldname, originalname, buffer } = fileObj;
        const generatedPublicId = this.generatePublicId(bucket, originalname, fieldname);
        const uploader = this.makeCloudinaryStream(bucket, generatedPublicId, 'image');
        console.log({ uploader });
        const uploadFileResult = await uploader.streamUploader(buffer);
        return {
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        };
    }
};
exports.StorageUtilService = StorageUtilService;
exports.StorageUtilService = StorageUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_util_1.CloudinaryBaseUtilService])
], StorageUtilService);
//# sourceMappingURL=storage.util.js.map