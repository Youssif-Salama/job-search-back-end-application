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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_dto_1 = require("../../shared/dtos/doctor.dto");
const doctor_service_1 = require("./doctor.service");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
let DoctorController = class DoctorController {
    doctorService;
    jwtService;
    constructor(doctorService, jwtService) {
        this.doctorService = doctorService;
        this.jwtService = jwtService;
    }
    async doctorSignup(data) {
        return this.doctorService.doctorSignup(data);
    }
    async doctorProfileVerifyAccountEmail(data) {
        return this.doctorService.doctorProfileVerifyAccountEmail(data);
    }
    async doctorLogin(data) {
        return this.doctorService.doctorLogin(data);
    }
    async updateMyDoctorProfileRawData(data, req) {
        const { id } = req['user'];
        return this.doctorService.updateMyDoctorProfileRawData(data, id);
    }
    async verifyUpdatedEmail(res, token) {
        const decoded = this.jwtService.verifyToken(token);
        if (!decoded || !decoded.email || !decoded.id) {
            return res.status(400).send('Invalid credentials!!!');
        }
        return this.doctorService.verifyUpdatedEmail({ email: decoded.email, id: +decoded.id }, res);
    }
    async verifyDoctorEmailAfterUpdateOtp(otp, token) {
        const decoded = this.jwtService.verifyToken(token);
        if (!decoded || !decoded.email || !decoded.id) {
            throw new common_1.BadRequestException('Invalid credentials!!!');
        }
        return this.doctorService.verifyDoctorEmailAfterUpdateOtp({ otp, email: decoded.email, id: +decoded.id });
    }
    async doctorResetPasswordRequest(data) {
        return this.doctorService.doctorResetPasswordRequest(data);
    }
    async doctorResetPassword(data) {
        return this.doctorService.doctorResetPassword(data);
    }
    async chooseCategory(data, req) {
        const id = req['user'].id;
        return this.doctorService.doctorProfileChooseCategory(data, +id);
    }
    async doctorProfileUpdatePassword(data, req) {
        const { id } = req['user'];
        return this.doctorService.doctorProfileUpdatePassword(data, +id);
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Post)('/signup'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.AddDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorSignup", null);
__decorate([
    (0, common_1.Post)('verify-signup'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.doctorProfleVerifeAccountEmailDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorProfileVerifyAccountEmail", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.LoginDoctorDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorLogin", null);
__decorate([
    (0, common_1.Put)('/update-my-profile'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.DoctorUpdateRawDataDto, Request]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "updateMyDoctorProfileRawData", null);
__decorate([
    (0, common_1.Get)('verify-update-email'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "verifyUpdatedEmail", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('verify_doctor_email_after_update_otp_using'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Body)('otp')),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "verifyDoctorEmailAfterUpdateOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.doctorProfileResetPasswordDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorResetPasswordRequest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.doctorProfileResetPasswordDoDto]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorResetPassword", null);
__decorate([
    (0, common_1.Put)('choose-category'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.doctorProfileChooseCategoryDto, Request]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "chooseCategory", null);
__decorate([
    (0, common_1.Patch)('update-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_dto_1.updatePasswordDto, Request]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "doctorProfileUpdatePassword", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService, jwt_utils_1.JwtUtilService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map