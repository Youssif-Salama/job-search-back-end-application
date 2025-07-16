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
exports.WorkingHoursEntity = void 0;
const typeorm_1 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
let WorkingHoursEntity = class WorkingHoursEntity {
    id;
    day;
    time;
    doctor;
};
exports.WorkingHoursEntity = WorkingHoursEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkingHoursEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: false }),
    __metadata("design:type", Object)
], WorkingHoursEntity.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: false }),
    __metadata("design:type", Object)
], WorkingHoursEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctors_entity_1.DoctorEntity, doctor => doctor.workinHours),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", doctors_entity_1.DoctorEntity)
], WorkingHoursEntity.prototype, "doctor", void 0);
exports.WorkingHoursEntity = WorkingHoursEntity = __decorate([
    (0, typeorm_1.Entity)()
], WorkingHoursEntity);
//# sourceMappingURL=workinHours.entity.js.map