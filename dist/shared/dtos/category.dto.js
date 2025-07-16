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
exports.updateCategoryDto = exports.addCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MultiLangString {
    en;
    ar;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], MultiLangString.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'فئة' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], MultiLangString.prototype, "ar", void 0);
class MultiLangText {
    en;
    ar;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'category description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], MultiLangText.prototype, "en", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'وصف الفئة' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], MultiLangText.prototype, "ar", void 0);
class addCategoryDto {
    title;
    description;
}
exports.addCategoryDto = addCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MultiLangString }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultiLangString),
    __metadata("design:type", MultiLangString)
], addCategoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MultiLangText }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultiLangText),
    __metadata("design:type", MultiLangText)
], addCategoryDto.prototype, "description", void 0);
class updateCategoryDto {
    title;
    description;
}
exports.updateCategoryDto = updateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MultiLangString }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultiLangString),
    __metadata("design:type", MultiLangString)
], updateCategoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: MultiLangText }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MultiLangText),
    __metadata("design:type", MultiLangText)
], updateCategoryDto.prototype, "description", void 0);
//# sourceMappingURL=category.dto.js.map