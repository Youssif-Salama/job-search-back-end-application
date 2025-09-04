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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const file_dto_1 = require("../../shared/dtos/file.dto");
const file_service_1 = require("./file.service");
let FileController = class FileController {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    async uploadMyDoctorProfileAuthFiles(req, files) {
        const { id } = req['user'];
        return this.fileService.createDoctorAuthFiles(+id, files);
    }
    async uploadMyDoctorProfileImg(req, file) {
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorProfileImg(+doctorId, file);
    }
    async uploadMyDoctorProfileClinicFiles(req, files) {
        let keepFiles = [];
        if (req.body.keepFiles) {
            try {
                keepFiles = typeof req.body.keepFiles === 'string'
                    ? JSON.parse(req.body.keepFiles)
                    : req.body.keepFiles;
            }
            catch {
                throw new common_1.BadRequestException("keepFiles must be a valid JSON array");
            }
        }
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorClincFiles(+doctorId, files, keepFiles);
    }
    async updateMyDoctorProfileAuthFiles(files, req) {
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorAuthFiles(+doctorId, files);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('doctor/auth'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "card", maxCount: 1 },
        { name: "fid", maxCount: 1 },
    ])),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "doctor profile auth files, بعد م الدكتور يسجل بياناته لاول مره",
        type: file_dto_1.DoctorProfileAuthFiles
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadMyDoctorProfileAuthFiles", null);
__decorate([
    (0, common_1.Patch)("doctor/img"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img')),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "doctor profile image, اضافه او تعديل الصوره الشخصيه للدكتور",
        type: file_dto_1.DoctorProfileImgDto
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadMyDoctorProfileImg", null);
__decorate([
    (0, common_1.Patch)("doctor/clinic"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiBody)({
        description: "doctor profile clinic files, اضافه ملفات العياده او التعديل عليها",
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary"
                    },
                    description: "Up to 10 files"
                },
                keepFiles: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            public_id: {
                                type: "string",
                                description: "Public ID of the old file to keep"
                            },
                            url: {
                                type: "string",
                                description: "URL of the old file to keep"
                            }
                        }
                    },
                    nullable: true,
                    description: "List of old files to keep (can be empty or omitted)"
                }
            }
        }
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadMyDoctorProfileClinicFiles", null);
__decorate([
    (0, common_1.Patch)('doctor/auth'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "card", maxCount: 1 },
        { name: "fid", maxCount: 1 },
    ])),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        description: "doctor profile auth تعديل الملفات ",
        type: file_dto_1.DoctorProfileAuthUpdateFiles
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "updateMyDoctorProfileAuthFiles", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map