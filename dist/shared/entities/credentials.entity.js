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
exports.CredentialEntity = void 0;
const typeorm_1 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
let CredentialEntity = class CredentialEntity {
    id;
    password;
    credits;
    createdAt;
    updatedAt;
    doctor;
};
exports.CredentialEntity = CredentialEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CredentialEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], CredentialEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 30 }),
    __metadata("design:type", Number)
], CredentialEntity.prototype, "credits", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CredentialEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CredentialEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => doctors_entity_1.DoctorEntity, doctor => doctor.credential),
    __metadata("design:type", doctors_entity_1.DoctorEntity)
], CredentialEntity.prototype, "doctor", void 0);
exports.CredentialEntity = CredentialEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`"password" ~* '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'`)
], CredentialEntity);
//# sourceMappingURL=credentials.entity.js.map