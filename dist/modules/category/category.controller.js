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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_dto_1 = require("../../shared/dtos/category.dto");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const localization_interceptor_1 = require("../../common/interceptors/localization.interceptor");
const category_service_1 = require("./category.service");
const platform_express_1 = require("@nestjs/platform-express");
const storage_util_1 = require("../../common/utils/storage.util");
let CategoryController = class CategoryController {
    categoryService;
    storageServic;
    constructor(categoryService, storageServic) {
        this.categoryService = categoryService;
        this.storageServic = storageServic;
    }
    async addCategory(data, file, req) {
        const bucket = 'categories';
        const img = await this.storageServic.uploadFile(file, bucket);
        if (!img) {
            throw new Error('Image upload failed');
        }
        data.title = JSON.parse(data?.title);
        data.description = JSON.parse(data?.description);
        return this.categoryService.addCategory(data, img, req['user']?.id);
    }
    async updateCategory(id, data, file, req) {
        data.title = JSON.parse(data?.title);
        data.description = JSON.parse(data?.description);
        return this.categoryService.updateCategory(data, +id, file, req['user']?.id);
    }
    async deleteCategory(id) {
        return this.categoryService.deleteCategory(+id);
    }
    async deleteAllCategories() {
        return this.categoryService.deleteAllCategories();
    }
    async getAllCategories(query, req) {
        return this.categoryService.getAllCategories(+query.page, +query.limit, req['localeCode']);
    }
    async getOneCategory(id, req) {
        return this.categoryService.getOneCategory(+id, req['localeCode']);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Add a new category',
        type: category_dto_1.addCategoryDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('img')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryFormDataDto, Object, Request]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Update an existing category',
        type: category_dto_1.updateCategoryDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("img")),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_dto_1.CategoryFormDataDto, Object, Request]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', required: true, type: Number }),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteAllCategories", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(localization_interceptor_1.default),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiQuery)({ name: 'page', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: true, type: Number }),
    (0, swagger_1.ApiHeader)({
        name: 'locale-code',
        description: 'The language code (e.g., en, ar)',
        required: false,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, common_1.UseInterceptors)(localization_interceptor_1.default),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiHeader)({
        name: 'locale-code',
        description: 'The language code (e.g., en, ar)',
        required: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getOneCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService, storage_util_1.StorageUtilService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map