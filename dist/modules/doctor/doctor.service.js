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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const doctors_entity_1 = require("../../shared/entities/doctors.entity");
const typeorm_1 = require("typeorm");
const credential_service_1 = require("../credential/credential.service");
const typeorm_2 = require("@nestjs/typeorm");
const plan_service_1 = require("../plan/plan.service");
const code_util_1 = require("../../common/utils/code.util");
const mail_util_1 = require("../../common/utils/mail.util");
const otp_util_1 = require("../../common/utils/otp.util");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
const config_1 = require("@nestjs/config");
const doctor_verifyUpdateEmail_1 = require("../../common/pages/doctor.verifyUpdateEmail");
const bcrypt_util_1 = require("../../common/utils/bcrypt.util");
const category_service_1 = require("../category/category.service");
const workinHours_entity_1 = require("../../shared/entities/workinHours.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let DoctorService = class DoctorService {
    doctorRepo;
    workingHoursRepo;
    credintialService;
    planService;
    codeService;
    emailService;
    otpService;
    jwtService;
    config;
    bcryptService;
    categoryService;
    constructor(doctorRepo, workingHoursRepo, credintialService, planService, codeService, emailService, otpService, jwtService, config, bcryptService, categoryService) {
        this.doctorRepo = doctorRepo;
        this.workingHoursRepo = workingHoursRepo;
        this.credintialService = credintialService;
        this.planService = planService;
        this.codeService = codeService;
        this.emailService = emailService;
        this.otpService = otpService;
        this.jwtService = jwtService;
        this.config = config;
        this.bcryptService = bcryptService;
        this.categoryService = categoryService;
    }
    async doctorSignup(data) {
        const { email, phone } = data;
        const existingDoctor = await this.doctorRepo.findOne({
            where: [{ email }, { phone }]
        });
        if (existingDoctor)
            throw new common_1.ConflictException("Email or phone already in use");
        const doctor = this.doctorRepo.create(data);
        const credential = await this.credintialService.createDoctorCredits({
            password: await this.bcryptService.bcryptHashingUtil(data.password),
            doctor
        });
        if (!credential)
            throw new common_1.ConflictException("Failed to create doctor credits");
        const basicPlan = await this.planService.getTheBasicPlan();
        if (!basicPlan)
            throw new common_1.ConflictException("Basic plan not found");
        let code = this.codeService.makeAfliateCode({ id: doctor.id, fullName: doctor.fullName });
        console.log({ code });
        doctor.code = {
            code,
            count: 0
        };
        doctor.plan = basicPlan;
        doctor.credential = credential;
        let otp = this.otpService.generateComplexOtp(6);
        doctor.otp = otp;
        const savedDoctor = await this.doctorRepo.save(doctor);
        if (!savedDoctor)
            throw new common_1.ConflictException("Failed to save doctor");
        this.emailService.sendMail({
            to: savedDoctor.email,
            subject: "DRS - Doctor Signup Confirmation",
            template: "doctor_signup",
            context: {
                name: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname,
                otp: savedDoctor.otp,
            }
        });
        const token = this.jwtService.generateToken({
            fullName: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname, id: savedDoctor.id, isActive: savedDoctor.isActive,
            isVerified: savedDoctor.isVerified, email: savedDoctor.email
        });
        return {
            fullName: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname,
            isActive: savedDoctor.isActive,
            isVerified: savedDoctor.isVerified,
            token
        };
    }
    async doctorProfileVerifyAccountEmail(data) {
        const { email, otp } = data;
        const doctor = await this.doctorRepo.findOne({ where: { email } });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor account not found!!");
        if (!doctor.otp || doctor.otp != otp)
            throw new common_1.ConflictException("Something went wrong with otp!!");
        doctor.isVerified = true;
        doctor.otp = "";
        try {
            await this.doctorRepo.save(doctor);
            return {
                fullName: doctor.fullName.fname + " " + doctor.fullName.lname,
                isActive: doctor.isActive,
                isVerified: doctor.isVerified,
            };
        }
        catch (error) {
            throw new common_1.ConflictException("Somthing went wrong on valid your account");
        }
    }
    async doctorLogin(data) {
        const doctor = await this.doctorRepo.findOne({
            where: { email: data.email }
        });
        if (!doctor)
            throw new common_1.NotFoundException("Account not found!");
        if (!doctor.isActive)
            throw new common_1.ConflictException("Account is not active!");
        if (!doctor.isVerified)
            throw new common_1.ConflictException("Account is not verified!");
        const token = await this.jwtService.generateToken({
            email: data.email,
            id: doctor.id
        });
        const doctorData = {
            name: doctor.fullName,
            email: doctor.email,
            img: doctor.img
        };
        return { token, doctor: doctorData };
    }
    async updateMyDoctorProfileRawData(data, doctorId) {
        const { email, phone, fullName, address, clinc } = data;
        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found!");
        }
        const existingImgs = doctor.clinc?.imgs || [];
        let isEmailChanged = false;
        const updates = {};
        if (email && email !== doctor.email) {
            isEmailChanged = true;
            updates.email = email;
            updates.isVerified = false;
            updates.otp = this.otpService.generateComplexOtp(6);
        }
        if (phone && phone !== doctor.phone) {
            updates.phone = phone;
        }
        if (fullName && JSON.stringify(fullName) !== JSON.stringify(doctor.fullName)) {
            updates.fullName = fullName;
        }
        if (address && JSON.stringify(address) !== JSON.stringify(doctor.address)) {
            updates.address = address;
        }
        if (clinc && JSON.stringify(clinc) !== JSON.stringify(doctor.clinc)) {
            updates.clinc = {
                ...clinc,
                imgs: existingImgs
            };
        }
        if (Object.keys(updates).length === 0) {
            return {
                fullName: `${doctor.fullName.fname} ${doctor.fullName.lname}`,
                isActive: doctor.isActive,
                isVerified: doctor.isVerified,
            };
        }
        Object.assign(doctor, updates);
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new common_1.ConflictException("Failed to update account data");
        }
        this.emailService.sendMail({
            to: updatedDoctor.email,
            subject: "DRS - Email Update Verification",
            template: "doctor_update_email",
            context: {
                name: updatedDoctor.fullName.fname + " " + updatedDoctor.fullName.lname,
                otp: updatedDoctor.otp,
                link: this.config.get('envConfig.be.updateMyEmailRedirectionLink') + "/verify_update_email" + `?token=${this.jwtService.generateToken({ email: updatedDoctor.email, id: updatedDoctor.id })}`
            }
        });
        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }
    async verifyUpdatedEmail(data, res) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email } });
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        else {
            res.send((0, doctor_verifyUpdateEmail_1.default)(doctor.fullName.fname + " " + doctor.fullName.lname));
        }
    }
    async verifyDoctorEmailAfterUpdateOtp(data) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email, id: data.id } });
        if (!doctor) {
            throw new common_1.NotFoundException("Doctor not found");
        }
        if (doctor.otp !== data.otp) {
            throw new common_1.ConflictException("Invalid OTP");
        }
        doctor.isVerified = true;
        doctor.otp = "";
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new common_1.ConflictException("Failed to update doctor email verification status");
        }
        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }
    async doctorResetPasswordRequest(data) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email } });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor not found");
        if (!doctor.isActive)
            throw new common_1.ConflictException("Doctor account is not active");
        if (!doctor.isVerified)
            throw new common_1.ConflictException("Doctor account is not verified");
        doctor.otp = this.otpService.generateComplexOtp(6);
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor)
            throw new common_1.ConflictException("Something went wrong while updating doctor data");
        this.emailService.sendMail({
            to: updatedDoctor.email,
            subject: "DRS - Password Reset Request",
            template: "doctor_reset_password_request",
            context: {
                name: updatedDoctor.fullName.fname + " " + updatedDoctor.fullName.lname,
                otp: updatedDoctor.otp
            }
        });
        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }
    async doctorResetPassword(data) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email }, relations: ['credential'] });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor account not found!");
        if (!doctor.isActive)
            throw new common_1.ConflictException("Doctor account is not active");
        if (!doctor.isVerified)
            throw new common_1.ConflictException("Doctor account is not verified");
        if (data.otp !== doctor.otp)
            throw new common_1.ConflictException('Invalid OTP!');
        if (!doctor.credential)
            throw new common_1.ConflictException("Doctor credentials not found!");
        doctor.credential.password = await this.bcryptService.bcryptHashingUtil(data.password);
        doctor.otp = "";
        await this.credintialService.saveDoctorCredential(doctor.credential);
        await this.doctorRepo.save(doctor);
        return {
            message: "Password reset successfully",
            fullName: `${doctor.fullName.fname} ${doctor.fullName.lname}`,
            isActive: doctor.isActive,
            isVerified: doctor.isVerified,
        };
    }
    async doctorProfileChooseCategory(data, id) {
        const category = await this.categoryService.findOneCategoryForDoctor(+data?.categoryId);
        if (!category)
            throw new common_1.NotFoundException("Category not found!!");
        const doctor = await this.doctorRepo.findOne({ where: { id } });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor account not found!!");
        doctor.category = category;
        try {
            const savedDoctor = await this.doctorRepo.save(doctor);
            return savedDoctor;
        }
        catch (error) {
            throw new common_1.ConflictException("Failed to update doctor's category.");
        }
    }
    async doctorProfileUpdatePassword(data, id) {
        const doctor = await this.doctorRepo.findOne({ where: { id }, relations: ['credential'] });
        if (!doctor)
            throw new common_1.NotFoundException("Doctor account not found!!");
        const { oldPassword, password } = data;
        const isPassvalid = await this.bcryptService.bcryptCompareUtil(oldPassword, doctor.credential.password);
        if (!isPassvalid)
            throw new common_1.ConflictException("Old password not match!!");
        doctor.credential.password = await this.bcryptService.bcryptHashingUtil(password);
        try {
            const savedDoctor = await this.doctorRepo.save(doctor);
            return savedDoctor;
        }
        catch (error) {
            throw new common_1.ConflictException("Failed to update doctor's password");
        }
    }
    async doctorProfileView(viewedDoctorId, data) {
        const doctor = await this.doctorRepo.findOne({ where: { id: viewedDoctorId } });
        if (!doctor)
            throw new common_1.ConflictException("Account not found!!");
        const viewerDoctor = (data.viewerId) ? await this.doctorRepo.findOne({ where: { id: data.viewerId } }) : null;
        const readyViewerData = {
            ip: data.viewerIp.toString(),
            viewer: viewerDoctor ?? null,
            date: new Date()
        };
        const isViewerExist = Array.from(doctor.views).some(view => view.ip.toString() === readyViewerData.ip.toString() ||
            (readyViewerData.viewer && view.viewer?.id === readyViewerData.viewer.id));
        if (!isViewerExist) {
            doctor.views = [...(doctor.views || []), readyViewerData];
            await this.doctorRepo.save(doctor);
        }
    }
    async getMyData(id) {
        const doctor = await this.doctorRepo.findOne({ where: { id } });
        if (!doctor)
            throw new common_1.ConflictException("Something went wrong, Account not found!!");
        return doctor;
    }
    async clincAndWorkingDays(data, doctorId) {
        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (!doctor)
            throw new common_1.NotFoundException("Cannot found doctor account.");
        const { clinc, workingHours } = data;
        return await this.doctorRepo.manager.transaction(async (manager) => {
            doctor.clinc = {
                name: clinc.name || doctor.clinc.name,
                description: clinc.description || doctor.clinc.description,
                address: clinc.address || doctor.clinc.address,
                phone: clinc.phone || doctor.clinc.phone,
                whats: clinc.whats || doctor.clinc.whats,
                landingPhone: clinc.landingPhone || doctor.clinc.landingPhone,
                price: clinc.price || doctor.clinc.price,
                rePrice: clinc.rePrice || doctor.clinc.rePrice,
                imgs: doctor.clinc.imgs
            };
            const savedDoctor = await manager.save(doctor);
            await manager.delete(this.workingHoursRepo.target, { doctor: savedDoctor });
            const addWorkingHours = await Promise.all(workingHours.map((wh) => manager.save(this.workingHoursRepo.create({
                day: wh.day,
                time: {
                    from: wh.time.from,
                    to: wh.time.to,
                },
                doctor: savedDoctor,
            }))));
            if (!addWorkingHours || addWorkingHours.length === 0) {
                throw new common_1.ConflictException("Failed to add Clinic Working hours.");
            }
            return {
                doctor: savedDoctor,
                workingHours: addWorkingHours
            };
        });
    }
    async getAllDoctors(queryObj) {
        const qb = this.doctorRepo.createQueryBuilder("doctor");
        if (queryObj.governorate) {
            qb.andWhere("doctor.address ->> 'governorate' = :gov", { gov: queryObj.governorate });
        }
        if (queryObj.center) {
            qb.andWhere("doctor.address ->> 'center' = :center", { center: queryObj.center });
        }
        if (queryObj.price) {
            const { from, to } = queryObj.price;
            if (from !== undefined) {
                qb.andWhere("(doctor.clinc ->> 'price')::numeric >= :from", { from });
            }
            if (to !== undefined) {
                qb.andWhere("(doctor.clinc ->> 'price')::numeric <= :to", { to });
            }
        }
        if (queryObj.search) {
            qb.andWhere(`(doctor.fullName ->> 'fname' ILIKE :search OR doctor.fullName ->> 'lname' ILIKE :search OR doctor.phone ILIKE :search OR doctor.email ILIKE :search)`, { search: `%${queryObj.search}%` });
        }
        if (queryObj.orderKey && queryObj.orderValue) {
            qb.orderBy(`doctor.${queryObj.orderKey}`, queryObj.orderValue);
        }
        const page = queryObj.page ? Number(queryObj.page) : 1;
        const limit = queryObj.limit ? Number(queryObj.limit) : 10;
        return (0, nestjs_typeorm_paginate_1.paginate)(qb, { page, limit, route: '/doctor' });
    }
    async handleBlockDoctor(idNo) {
        if (!idNo)
            throw new common_1.BadRequestException("Doctor id not found.");
        const doctor = await this.doctorRepo.findOne({
            where: { id: idNo }
        });
        if (!doctor)
            throw new common_1.ConflictException("Doctor not found.");
        const updatedDoctorStatus = (doctor.isActive).toString() == "true" ? false : true;
        doctor.isActive = updatedDoctorStatus;
        await this.doctorRepo.save(doctor);
        return {
            name: doctor.fullName,
            email: doctor.email,
            isActive: doctor.isActive
        };
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(doctors_entity_1.DoctorEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(workinHours_entity_1.WorkingHoursEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        credential_service_1.CredentialService, plan_service_1.PlanService, code_util_1.CodeUtilService, mail_util_1.MailUtilService, otp_util_1.OtpUtilService, jwt_utils_1.JwtUtilService, config_1.ConfigService, bcrypt_util_1.BcryptUtilService, category_service_1.CategoryService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map