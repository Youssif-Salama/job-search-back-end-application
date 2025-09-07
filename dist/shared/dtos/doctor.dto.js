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
exports.GetDoctorQueriesDto = exports.orderKeyEnums = exports.ClincAndWorkingDaysDto = exports.PaymentWay = exports.DoctorProfileViewerDto = exports.doctorProfleVerifeAccountEmailDto = exports.updatePasswordDto = exports.doctorProfileChooseCategoryDto = exports.doctorProfileResetPasswordDoDto = exports.doctorProfileResetPasswordDto = exports.DoctorUpdateRawDataDto = exports.LoginDoctorDto = exports.DoctorFilesDto = exports.AddDoctorDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const working_hours_dto_1 = require("./working-hours.dto");
class FullNameDto {
    fname;
    lname;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the doctor',
        example: 'Ahmed',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FullNameDto.prototype, "fname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the doctor',
        example: 'Mohamed',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FullNameDto.prototype, "lname", void 0);
class AddressDto {
    governorate;
    center;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Governorate',
        example: 'Cairo',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "governorate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Center within the governorate',
        example: 'Nasr City',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "center", void 0);
class ClincAddressDto {
    link;
    description;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic location link in multiple languages',
        example: { en: 'https://maps.example.com', ar: 'https://خريطة.مثال.كوم' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincAddressDto.prototype, "link", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic address description in multiple languages',
        example: { en: 'Floor 2, Building 5', ar: 'الطابق الثاني، مبنى 5' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincAddressDto.prototype, "description", void 0);
class ClincDto {
    name;
    description;
    address;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic name in multiple languages',
        example: { en: 'Family Clinic', ar: 'عيادة الأسرة' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic description in multiple languages',
        example: { en: 'We care about your health', ar: 'نحن نهتم بصحتك' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic address including link and description',
        required: true,
        type: () => ClincAddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ClincAddressDto),
    __metadata("design:type", ClincAddressDto)
], ClincDto.prototype, "address", void 0);
class AddDoctorDto {
    email;
    phone;
    fullName;
    address;
    password;
    syndicateNo;
}
exports.AddDoctorDto = AddDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddDoctorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor phone number',
        example: '01012345678',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddDoctorDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor full name (first and last)',
        required: true,
        type: () => FullNameDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FullNameDto),
    __metadata("design:type", FullNameDto)
], AddDoctorDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor address including governorate and center',
        required: true,
        type: () => AddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], AddDoctorDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], AddDoctorDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "syndicateNo",
        description: "syndicate membership no",
        required: true,
        type: String
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddDoctorDto.prototype, "syndicateNo", void 0);
class DoctorFilesDto {
    card;
    fid;
    sid;
}
exports.DoctorFilesDto = DoctorFilesDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        name: "card",
        description: "this field refer to doctor's card",
        type: 'string',
        format: 'binary'
    }),
    __metadata("design:type", typeorm_1.Binary)
], DoctorFilesDto.prototype, "card", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        name: 'fid',
        description: 'fid refer to front face of the national id',
        type: 'string',
        format: 'binary'
    }),
    __metadata("design:type", typeorm_1.Binary)
], DoctorFilesDto.prototype, "fid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        name: 'sid',
        description: 'sid refer to back face of the national id',
        type: 'string',
        format: 'binary'
    }),
    __metadata("design:type", typeorm_1.Binary)
], DoctorFilesDto.prototype, "sid", void 0);
class LoginDoctorDto {
    email;
    password;
}
exports.LoginDoctorDto = LoginDoctorDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        description: 'Email of the doctor',
        example: 'doctor@gmail.com',
        required: true,
        type: String
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDoctorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'password',
        description: 'Password of the doctor',
        example: 'StrongP@ssword1',
        required: true,
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDoctorDto.prototype, "password", void 0);
class DoctorUpdateRawDataDto {
    email;
    phone;
    fullName;
    address;
    clinc;
}
exports.DoctorUpdateRawDataDto = DoctorUpdateRawDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DoctorUpdateRawDataDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor phone number',
        example: '01012345678',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DoctorUpdateRawDataDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor full name (first and last)',
        required: true,
        type: () => FullNameDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FullNameDto),
    __metadata("design:type", FullNameDto)
], DoctorUpdateRawDataDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor address including governorate and center',
        required: true,
        type: () => AddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    __metadata("design:type", AddressDto)
], DoctorUpdateRawDataDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor clinic information',
        required: true,
        type: () => ClincDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ClincDto),
    __metadata("design:type", ClincDto)
], DoctorUpdateRawDataDto.prototype, "clinc", void 0);
class doctorProfileResetPasswordDto {
    email;
}
exports.doctorProfileResetPasswordDto = doctorProfileResetPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], doctorProfileResetPasswordDto.prototype, "email", void 0);
class doctorProfileResetPasswordDoDto {
    email;
    otp;
    password;
}
exports.doctorProfileResetPasswordDoDto = doctorProfileResetPasswordDoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], doctorProfileResetPasswordDoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'otp',
        description: 'OTP code for password reset',
        example: '123456',
        required: true,
        type: String
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], doctorProfileResetPasswordDoDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], doctorProfileResetPasswordDoDto.prototype, "password", void 0);
class doctorProfileChooseCategoryDto {
    categoryId;
}
exports.doctorProfileChooseCategoryDto = doctorProfileChooseCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'category id',
        description: 'choosed category id go here',
        type: 'number',
        required: true
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], doctorProfileChooseCategoryDto.prototype, "categoryId", void 0);
class updatePasswordDto {
    oldPassword;
    password;
}
exports.updatePasswordDto = updatePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "old password",
        description: "old passwor dgo here",
        type: "string",
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], updatePasswordDto.prototype, "password", void 0);
class doctorProfleVerifeAccountEmailDto {
    email;
    otp;
}
exports.doctorProfleVerifeAccountEmailDto = doctorProfleVerifeAccountEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], doctorProfleVerifeAccountEmailDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'otp',
        description: 'otp go here',
        required: true,
        type: String
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], doctorProfleVerifeAccountEmailDto.prototype, "otp", void 0);
class DoctorProfileViewerDto {
    viewerId;
    viewerIp;
}
exports.DoctorProfileViewerDto = DoctorProfileViewerDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "viewerId",
        description: "viewerId go here",
        example: 2,
        required: false,
        type: "number"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DoctorProfileViewerDto.prototype, "viewerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "viewerIp",
        description: "viewerIp go here",
        example: 2,
        required: false,
        type: "string"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], DoctorProfileViewerDto.prototype, "viewerIp", void 0);
var PaymentWay;
(function (PaymentWay) {
    PaymentWay["CASH"] = "cash";
    PaymentWay["VESA"] = "vesa";
    PaymentWay["BUCKET"] = "bucket";
})(PaymentWay || (exports.PaymentWay = PaymentWay = {}));
class ClincForWorkingHourDto {
    name;
    description;
    address;
    phone;
    whats;
    landingPhone;
    price;
    rePrice;
    paymentWay;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic name in multiple languages',
        example: { en: 'Family Clinic', ar: 'عيادة الأسرة' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincForWorkingHourDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic description in multiple languages',
        example: { en: 'We care about your health', ar: 'نحن نهتم بصحتك' },
        required: true,
        type: Object,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ClincForWorkingHourDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clinic address including link and description',
        required: true,
        type: () => ClincAddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ClincAddressDto),
    __metadata("design:type", ClincAddressDto)
], ClincForWorkingHourDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "phone",
        description: "normal phone number, starts with +20",
        type: "string",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClincForWorkingHourDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "whats",
        description: "normal whats number",
        type: "string",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClincForWorkingHourDto.prototype, "whats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "landing phone",
        description: "normal landing phone number",
        type: "string",
        required: true
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClincForWorkingHourDto.prototype, "landingPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "price",
        description: "price",
        type: "number",
        required: true
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ClincForWorkingHourDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "rePrice",
        description: "re price",
        type: "number",
        required: true
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ClincForWorkingHourDto.prototype, "rePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: PaymentWay,
        description: "Payment method",
        required: true
    }),
    (0, class_validator_1.IsEnum)(PaymentWay),
    __metadata("design:type", String)
], ClincForWorkingHourDto.prototype, "paymentWay", void 0);
class ClincAndWorkingDaysDto {
    clinc;
    workingHours;
}
exports.ClincAndWorkingDaysDto = ClincAndWorkingDaysDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "clinc",
        type: ClincForWorkingHourDto
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ClincForWorkingHourDto),
    __metadata("design:type", ClincForWorkingHourDto)
], ClincAndWorkingDaysDto.prototype, "clinc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "workingHours",
        type: [working_hours_dto_1.AddWoringHourDto]
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => working_hours_dto_1.AddWoringHourDto),
    __metadata("design:type", Array)
], ClincAndWorkingDaysDto.prototype, "workingHours", void 0);
var orderKeyEnums;
(function (orderKeyEnums) {
    orderKeyEnums["RATING"] = "rating";
    orderKeyEnums["PRICE"] = "price";
    orderKeyEnums["VISITS"] = "views";
})(orderKeyEnums || (exports.orderKeyEnums = orderKeyEnums = {}));
class GetDoctorQueriesDto {
    page;
    limit;
    search;
    orderKey;
    orderValue;
    governorate;
    center;
    best;
    price;
}
exports.GetDoctorQueriesDto = GetDoctorQueriesDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetDoctorQueriesDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetDoctorQueriesDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDoctorQueriesDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(orderKeyEnums),
    __metadata("design:type", String)
], GetDoctorQueriesDto.prototype, "orderKey", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(["ASC", "DESC"], { message: "orderValue must be ASC or DESC" }),
    __metadata("design:type", String)
], GetDoctorQueriesDto.prototype, "orderValue", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDoctorQueriesDto.prototype, "governorate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDoctorQueriesDto.prototype, "center", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetDoctorQueriesDto.prototype, "best", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], GetDoctorQueriesDto.prototype, "price", void 0);
//# sourceMappingURL=doctor.dto.js.map