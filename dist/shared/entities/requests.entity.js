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
exports.RequestEntity = void 0;
const typeorm_1 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
const plans_entity_1 = require("./plans.entity");
let RequestEntity = class RequestEntity {
    id;
    done;
    type;
    lsUpBy;
    plan;
    doctor;
};
exports.RequestEntity = RequestEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RequestEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], RequestEntity.prototype, "done", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], RequestEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], RequestEntity.prototype, "lsUpBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plans_entity_1.PlanEntity, plan => plan.requests),
    (0, typeorm_1.JoinColumn)({ name: 'planId' }),
    __metadata("design:type", plans_entity_1.PlanEntity)
], RequestEntity.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctors_entity_1.DoctorEntity, doctor => doctor.requests),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", doctors_entity_1.DoctorEntity)
], RequestEntity.prototype, "doctor", void 0);
exports.RequestEntity = RequestEntity = __decorate([
    (0, typeorm_1.Entity)()
], RequestEntity);
//# sourceMappingURL=requests.entity.js.map