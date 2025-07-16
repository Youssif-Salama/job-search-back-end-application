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
let DoctorService = class DoctorService {
    doctorRepo;
    credintialService;
    planService;
    codeService;
    constructor(doctorRepo, credintialService, planService, codeService) {
        this.doctorRepo = doctorRepo;
        this.credintialService = credintialService;
        this.planService = planService;
        this.codeService = codeService;
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
            password: data.password,
            doctor
        });
        if (!credential)
            throw new common_1.ConflictException("Failed to create doctor credits");
        const basicPlan = await this.planService.getTheBasicPlan();
        if (!basicPlan)
            throw new common_1.ConflictException("Basic plan not found");
        let code = this.codeService.makeAfliateCode({ id: doctor.id, fullName: doctor.fullName });
        doctor.code = {
            code,
            count: 0
        };
        doctor.plan = basicPlan;
        doctor.credential = credential;
        const savedDoctor = await this.doctorRepo.save(doctor);
        if (!savedDoctor)
            throw new common_1.ConflictException("Failed to save doctor");
        return savedDoctor;
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(doctors_entity_1.DoctorEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository, credential_service_1.CredentialService, plan_service_1.PlanService, code_util_1.CodeUtilService])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map