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
exports.getAllAdminsQueryDto = exports.updatePagesResponseDto = exports.UpdatePagesDto = exports.VerifyAdminDtoResponse = exports.BlockAdminDtoResponse = exports.updateMyAdminDataDto = exports.ResetPasswordDto = exports.ResetPasswordRequestDto = exports.VerifyAdminSignupDto = exports.UpdateMyAdminDataResponseDto = exports.LoginRequestResponseDto = exports.SignupResponseDto = exports.LoginAdminRequestDto = exports.LoginAdminDto = exports.CreateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdminDto {
    name;
    password;
    email;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin name',
        example: 'admin',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin email',
        example: 'admin@gmail.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
class LoginAdminDto {
    email;
    password;
    otp;
}
exports.LoginAdminDto = LoginAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin email',
        example: 'admin@gmail.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'OTP sent to admin email',
        example: '123456',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "otp", void 0);
class LoginAdminRequestDto {
    email;
}
exports.LoginAdminRequestDto = LoginAdminRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin email',
        example: 'admin@gmail.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginAdminRequestDto.prototype, "email", void 0);
class SignupResponseDto {
    name;
    role;
}
exports.SignupResponseDto = SignupResponseDto;
class LoginRequestResponseDto {
    name;
    role;
}
exports.LoginRequestResponseDto = LoginRequestResponseDto;
class UpdateMyAdminDataResponseDto {
    name;
    role;
}
exports.UpdateMyAdminDataResponseDto = UpdateMyAdminDataResponseDto;
class VerifyAdminSignupDto {
    email;
    otp;
}
exports.VerifyAdminSignupDto = VerifyAdminSignupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin email',
        example: 'admin@gmail.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], VerifyAdminSignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'OTP sent to admin email',
        example: '123456',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyAdminSignupDto.prototype, "otp", void 0);
class ResetPasswordRequestDto {
    email;
}
exports.ResetPasswordRequestDto = ResetPasswordRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "email",
        description: "email of admin",
        example: "admin@gmail.com",
        required: true,
        type: "string"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordRequestDto.prototype, "email", void 0);
class ResetPasswordDto {
    email;
    password;
    otp;
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "email",
        description: "email of admin",
        example: "admin@gmail.com",
        required: true,
        type: "string"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'OTP sent to admin email',
        example: '123456',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "otp", void 0);
class updateMyAdminDataDto {
    name;
    password;
    email;
}
exports.updateMyAdminDataDto = updateMyAdminDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin name',
        example: 'admin',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], updateMyAdminDataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], updateMyAdminDataDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin email',
        example: 'admin@gmail.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], updateMyAdminDataDto.prototype, "email", void 0);
class BlockAdminDtoResponse {
    name;
    isActive;
    role;
}
exports.BlockAdminDtoResponse = BlockAdminDtoResponse;
class VerifyAdminDtoResponse {
    name;
    role;
    isVerified;
}
exports.VerifyAdminDtoResponse = VerifyAdminDtoResponse;
class UpdatePagesDto {
    pages;
}
exports.UpdatePagesDto = UpdatePagesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        example: {
            "home": ["get", "post"]
        },
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], UpdatePagesDto.prototype, "pages", void 0);
class updatePagesResponseDto {
    pages;
    name;
    role;
}
exports.updatePagesResponseDto = updatePagesResponseDto;
class getAllAdminsQueryDto {
    page;
    sorting;
    limit;
    isActive;
    isVerified;
    search;
}
exports.getAllAdminsQueryDto = getAllAdminsQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "page",
        description: "page number",
        required: false,
        type: "number",
        default: 1
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], getAllAdminsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "sorting",
        type: "string",
        enum: ["ASC", "DESC"],
        default: "ASC",
        required: false
    }),
    (0, class_validator_1.IsEnum)(["ASC", "DESC"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], getAllAdminsQueryDto.prototype, "sorting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "limit",
        required: false,
        type: "number",
        default: 10
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], getAllAdminsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "isActive",
        required: false,
        type: "boolean"
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], getAllAdminsQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "isVerified",
        required: false,
        type: "boolean"
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], getAllAdminsQueryDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "search",
        required: false,
        type: "string"
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], getAllAdminsQueryDto.prototype, "search", void 0);
//# sourceMappingURL=admin.dto.js.map