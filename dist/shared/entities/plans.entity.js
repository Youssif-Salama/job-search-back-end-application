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
exports.PlanEntity = void 0;
const typeorm_1 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
const requests_entity_1 = require("./requests.entity");
let PlanEntity = class PlanEntity {
    id;
    title;
    description;
    price;
    lsUpBy;
    doctors;
    requests;
};
exports.PlanEntity = PlanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false, unique: true }),
    __metadata("design:type", Object)
], PlanEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false }),
    __metadata("design:type", Object)
], PlanEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false }),
    __metadata("design:type", Object)
], PlanEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], PlanEntity.prototype, "lsUpBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctors_entity_1.DoctorEntity, doctor => doctor.plan),
    __metadata("design:type", Array)
], PlanEntity.prototype, "doctors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => requests_entity_1.RequestEntity, request => request.plan),
    __metadata("design:type", Array)
], PlanEntity.prototype, "requests", void 0);
exports.PlanEntity = PlanEntity = __decorate([
    (0, typeorm_1.Entity)()
], PlanEntity);
//# sourceMappingURL=plans.entity.js.map