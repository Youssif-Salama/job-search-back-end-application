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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const bcrypt_util_1 = require("../../common/utils/bcrypt.util");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
const mail_util_1 = require("../../common/utils/mail.util");
const otp_util_1 = require("../../common/utils/otp.util");
const admins_entity_1 = require("../../shared/entities/admins.entity");
const typeorm_2 = require("typeorm");
let AdminService = class AdminService {
    adminRepo;
    bcryptService;
    jwtService;
    mailService;
    otpService;
    configService;
    constructor(adminRepo, bcryptService, jwtService, mailService, otpService, configService) {
        this.adminRepo = adminRepo;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.otpService = otpService;
        this.configService = configService;
    }
    async createAdmin(data) {
        const { name, password, email } = data;
        const hashedPassword = await this.bcryptService.bcryptHashingUtil(password);
        const newAdmin = this.adminRepo.create({ name, password: hashedPassword, email });
        if (!newAdmin)
            throw new common_1.ConflictException("Something went wrong");
        const otp = this.otpService.generateComplexOtp(6);
        newAdmin.otp = otp;
        this.mailService.sendMail({
            to: email,
            subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
            template: "admin_signup",
            context: {
                name,
                otp,
                otpLink: "https://www.google.com"
            }
        });
        const savedAdmin = await this.adminRepo.save(newAdmin);
        return {
            name: savedAdmin.name,
            role: savedAdmin.role
        };
    }
    async verifyAdminSignup(data) {
        const { email, otp } = data;
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        if (admin.otp !== otp)
            throw new common_1.ConflictException("Something went wrong");
        admin.isActive = true;
        admin.otp = "";
        const savedAdmin = await this.adminRepo.save(admin);
        return {
            name: savedAdmin.name,
            role: savedAdmin.role
        };
    }
    async loginAdminRequest(data) {
        const { email } = data;
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        const otp = this.otpService.generateComplexOtp(6);
        admin.otp = otp;
        this.mailService.sendMail({
            to: email,
            subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
            template: "admin_login",
            context: {
                name: admin.name,
                otp,
                otpLink: "https://www.google.com"
            }
        });
        await this.adminRepo.save(admin);
        return {
            name: admin.name,
            role: admin.role
        };
    }
    async loginAdmin(data) {
        const { email, password, otp } = data;
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        if (admin.otp !== otp)
            throw new common_1.ConflictException("Something went wrong");
        console.log({ admin, password });
        const isPasswordValid = await this.bcryptService.bcryptCompareUtil(password, admin.password);
        if (!isPasswordValid)
            throw new common_1.ConflictException("Something went wrong");
        const { name, id } = admin;
        const token = this.jwtService.generateToken({ name, id, role: admin.role, isActive: admin.isActive, email, pages: admin.pages });
        admin.otp = "";
        await this.adminRepo.save(admin);
        return { token };
    }
    async resetPasswordRequest(data) {
        const admin = await this.adminRepo.findOne({ where: { email: data.email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        const otp = this.otpService.generateComplexOtp(6);
        admin.otp = otp;
        this.mailService.sendMail({
            to: data.email,
            subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
            template: "admin_reset_password_request",
            context: {
                name: admin.name,
                otp,
                otpLink: "https://www.google.com"
            }
        });
        await this.adminRepo.save(admin);
        return {};
    }
    async resetPassword(data) {
        const admin = await this.adminRepo.findOne({ where: { email: data.email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        if (admin.otp !== data.otp)
            throw new common_1.ConflictException("Something went wrong");
        const hashedPassword = await this.bcryptService.bcryptHashingUtil(data.password);
        admin.password = hashedPassword;
        admin.otp = "";
        await this.adminRepo.save(admin);
        return {};
    }
    async updateMyAdminData(data, id) {
        const { name, email, password } = data;
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin) {
            throw new common_1.ConflictException("Admin not found or an error occurred.");
        }
        if (name && name !== admin.name) {
            admin.name = name;
        }
        if (email && email !== admin.email) {
            admin.email = email;
            const otp = this.otpService.generateComplexOtp(6);
            admin.otp = otp;
            const hashedOtp = await this.bcryptService.bcryptHashingUtil(otp);
            const token = this.jwtService.generateToken({ otp: hashedOtp, email }, "1h");
            await this.mailService.sendMail({
                to: email,
                subject: "بريد الكتروني اوتوماتيكي موجه من موقع DRS، يرجى اتباع الخطوات أدناه.",
                template: "update_my_admin_data",
                context: {
                    name: admin.name,
                    redirectLink: this.configService.get('envConfig.links.updateMyEmailRedirectionLink') + token,
                },
            });
            admin.isVerified = false;
        }
        if (password) {
            const isSamePassword = await this.bcryptService.bcryptCompareUtil(password, admin.password);
            if (!isSamePassword) {
                admin.password = await await this.bcryptService.bcryptHashingUtil(password);
            }
        }
        const savedAdmin = await this.adminRepo.save(admin);
        return {
            name: savedAdmin.name,
            role: savedAdmin.role,
        };
    }
    async verifyAccountIfUpdated(data) {
        const { otp, email } = data;
        const admin = await this.adminRepo.findOne({ where: { email } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        const isOtpCorrect = await this.bcryptService.bcryptCompareUtil(admin.otp, otp);
        if (!isOtpCorrect)
            throw new common_1.ConflictException("Something went wrong");
        admin.isVerified = true;
        admin.otp = "";
        await this.adminRepo.save(admin);
        return {
            name: admin.name,
            role: admin.role
        };
    }
    async getMyAdminData(id) {
        const admin = await this.adminRepo.findOne({
            where: { id }, select: {
                id: true,
                name: true,
                email: true,
                isVerified: true,
                isActive: true,
                role: true,
                pages: true
            }
        });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        return admin;
    }
    async blockAdmin(id) {
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        admin.isActive = !admin.isActive;
        await this.adminRepo.save(admin);
        return {
            isActive: admin.isActive,
            name: admin.name,
            role: admin.role
        };
    }
    async verifyAdmin(id) {
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        admin.isVerified = !admin.isVerified;
        await this.adminRepo.save(admin);
        return {
            isVerified: admin.isVerified,
            name: admin.name,
            role: admin.role
        };
    }
    async updatePages(data, id) {
        const admin = await this.adminRepo.findOne({ where: { id } });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        admin.pages = data.pages;
        await this.adminRepo.save(admin);
        return {
            pages: data.pages,
            name: admin.name,
            role: admin.role
        };
    }
    async getOneAdmin(id) {
        const admin = await this.adminRepo.findOne({
            where: { id }, select: {
                name: true, email: true, pages: true, isActive: true, isVerified: true, role: true
            }
        });
        if (!admin)
            throw new common_1.NotFoundException("Something went wrong");
        return admin;
    }
    async getAllAdmins(queries) {
        const adminsQuery = this.adminRepo.createQueryBuilder('admin');
        adminsQuery
            .select(["admin.id", "admin.name", "admin.email", "admin.isActive", "admin.isVerified"])
            .orderBy("admin.id", queries.sorting ?? "ASC");
        if (queries?.isActive !== undefined) {
            adminsQuery.andWhere("admin.isActive = :isActive", { isActive: queries.isActive });
        }
        if (queries?.isVerified !== undefined) {
            adminsQuery.andWhere("admin.isVerified = :isVerified", { isVerified: queries.isVerified });
        }
        if (queries?.search) {
            adminsQuery.andWhere("(admin.name LIKE :search OR admin.email LIKE :search)", { search: `%${queries.search}%` });
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(adminsQuery, {
            page: queries.page ?? 1,
            limit: queries.limit ?? 10,
            route: "/admin/all",
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admins_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_util_1.BcryptUtilService,
        jwt_utils_1.JwtUtilService,
        mail_util_1.MailUtilService,
        otp_util_1.OtpUtilService,
        config_1.ConfigService])
], AdminService);
//# sourceMappingURL=admin.service.js.map