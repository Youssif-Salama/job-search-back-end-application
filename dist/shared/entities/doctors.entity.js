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
exports.DoctorEntity = void 0;
const typeorm_1 = require("typeorm");
const plans_entity_1 = require("./plans.entity");
const requests_entity_1 = require("./requests.entity");
const workinHours_entity_1 = require("./workinHours.entity");
const appointments_entity_1 = require("./appointments.entity");
const class_validator_1 = require("class-validator");
const credentials_entity_1 = require("./credentials.entity");
const categoris_entity_1 = require("./categoris.entity");
class Localization {
    en;
    ar;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Localization.prototype, "en", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Localization.prototype, "ar", void 0);
let DoctorEntity = class DoctorEntity {
    id;
    email;
    phone;
    isDeleted;
    img;
    fullName;
    address;
    code;
    clinc;
    auth;
    isActive;
    isVerified;
    otp;
    createdAt;
    updatedAt;
    lsUpBy;
    plan;
    category;
    requests;
    workinHours;
    appointments;
    credential;
};
exports.DoctorEntity = DoctorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DoctorEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "clinc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DoctorEntity.prototype, "auth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DoctorEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DoctorEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DoctorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DoctorEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], DoctorEntity.prototype, "lsUpBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plans_entity_1.PlanEntity, plan => plan.doctors),
    __metadata("design:type", plans_entity_1.PlanEntity)
], DoctorEntity.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoris_entity_1.CategoryEntity, category => category.doctors),
    __metadata("design:type", categoris_entity_1.CategoryEntity)
], DoctorEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => requests_entity_1.RequestEntity, request => request.doctor),
    __metadata("design:type", Array)
], DoctorEntity.prototype, "requests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workinHours_entity_1.WorkingHoursEntity, workinHours => workinHours.doctor),
    __metadata("design:type", Array)
], DoctorEntity.prototype, "workinHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.AppointmentEntity, appointment => appointment.doctor),
    __metadata("design:type", Array)
], DoctorEntity.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => credentials_entity_1.CredentialEntity, credential => credential.doctor, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", credentials_entity_1.CredentialEntity)
], DoctorEntity.prototype, "credential", void 0);
exports.DoctorEntity = DoctorEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`"email" ~* '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'`),
    (0, typeorm_1.Check)(`"phone" ~* '^(010|011|012|015)\\d{8}$'`)
], DoctorEntity);
//# sourceMappingURL=doctors.entity.js.map