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
exports.ReservationEntity = void 0;
const typeorm_1 = require("typeorm");
const appointments_entity_1 = require("./appointments.entity");
const rates_entity_1 = require("./rates.entity");
let ReservationEntity = class ReservationEntity {
    id;
    name;
    phone;
    description;
    code;
    createdAt;
    updatedAt;
    appointment;
    rate;
};
exports.ReservationEntity = ReservationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => appointments_entity_1.AppointmentEntity, appoinment => appoinment.reservation),
    (0, typeorm_1.JoinColumn)({ name: 'appointmentId' }),
    __metadata("design:type", appointments_entity_1.AppointmentEntity)
], ReservationEntity.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => rates_entity_1.RateEntity, rate => rate.reservation, { nullable: true }),
    __metadata("design:type", rates_entity_1.RateEntity)
], ReservationEntity.prototype, "rate", void 0);
exports.ReservationEntity = ReservationEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`"phone" ~* '^(010|011|012|015)\\d{8}$'`)
], ReservationEntity);
//# sourceMappingURL=reservations.entity.js.map