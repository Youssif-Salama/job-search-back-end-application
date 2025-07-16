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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const check_pipes_1 = require("../../common/pipes/check.pipes");
const admin_dto_1 = require("../../shared/dtos/admin.dto");
const admin_service_1 = require("./admin.service");
const throttler_1 = require("@nestjs/throttler");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
let AdminController = class AdminController {
    adminService;
    jwtService;
    constructor(adminService, jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }
    async create(data) {
        return this.adminService.createAdmin(data);
    }
    async verifySignup(data) {
        return this.adminService.verifyAdminSignup(data);
    }
    async logAdminRequest(data) {
        console.log({ data });
        return this.adminService.loginAdminRequest(data);
    }
    async login(data) {
        return this.adminService.loginAdmin(data);
    }
    async resetPasswordRequest(data) {
        return this.adminService.resetPasswordRequest(data);
    }
    async resetPassword(data) {
        return this.adminService.resetPassword(data);
    }
    updateMyAdminData(data, req) {
        return this.adminService.updateMyAdminData(data, req.user.id);
    }
    blockAdmin(id) {
        return this.adminService.blockAdmin(id);
    }
    updatePages(data, id) {
        return this.adminService.updatePages(data, id);
    }
    verifyAdmin(id) {
        return this.adminService.verifyAdmin(id);
    }
    verifyAccountIfUpdated(token, res) {
        const decodedToken = this.jwtService.verifyToken(token);
        const result = this.adminService.verifyAccountIfUpdated(decodedToken);
        if (result.statusCode = 200)
            res.redirect("https://www.google.com");
        return result;
    }
    getMyAdminData(req) {
        return this.adminService.getMyAdminData(req.user.id);
    }
    getAll(queries) {
        return this.adminService.getAllAdmins(queries);
    }
    getOne(id) {
        return this.adminService.getOneAdmin(+id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(check_pipes_1.CheckAdminExistPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/verify-signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.VerifyAdminSignupDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifySignup", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login-request'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.LoginAdminRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logAdminRequest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.LoginAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/reset-password-request'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ResetPasswordRequestDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetPasswordRequest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Put)('/reset-password'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('/update-my-data/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.updateMyAdminDataDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateMyAdminData", null);
__decorate([
    (0, common_1.Put)('/block/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: "number"
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockAdmin", null);
__decorate([
    (0, common_1.Put)('/pages/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: "number"
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.UpdatePagesDto, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePages", null);
__decorate([
    (0, common_1.Put)('/verify/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: "number"
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyAdmin", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("/verify-account-if-updated/:token"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)("token")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyAccountIfUpdated", null);
__decorate([
    (0, common_1.Get)('/my-data'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMyAdminData", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.getAllAdminsQueryDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        type: "number"
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getOne", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, jwt_utils_1.JwtUtilService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map