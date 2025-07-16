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
const public_decorator_1 = require("../../common/decorators/public.decorator");
const storage_util_1 = require("../../common/utils/storage.util");
const doctor_dto_1 = require("../../shared/dtos/doctor.dto");
let FileController = class FileController {
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
    }
    async doctorFiles(files) {
        const [cardUploaded, fidUploaded, sidUploaded] = await Promise.all([
            this.storageService.uploadOne(files.card?.[0]),
            this.storageService.uploadOne(files.fid?.[0]),
            this.storageService.uploadOne(files.sid?.[0]),
        ]);
        const hasError = [cardUploaded, fidUploaded, sidUploaded].some((file) => file?.error);
        return {
            card: cardUploaded,
            fid: fidUploaded,
            sid: sidUploaded,
        };
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('/doctor'),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'card', maxCount: 1 },
        { name: 'fid', maxCount: 1 },
        { name: 'sid', maxCount: 1 },
    ])),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload doctor files (card, fid, sid)',
        type: doctor_dto_1.DoctorFilesDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "doctorFiles", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [storage_util_1.StorageUtilService])
], FileController);
//# sourceMappingURL=file.controller.js.map