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
exports.AppointmentEntity = void 0;
const typeorm_1 = require("typeorm");
const doctors_entity_1 = require("./doctors.entity");
const reservations_entity_1 = require("./reservations.entity");
let AppointmentEntity = class AppointmentEntity {
    id;
    day;
    time;
    description;
    closed;
    done;
    doctor;
    reservation;
};
exports.AppointmentEntity = AppointmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppointmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: false }),
    __metadata("design:type", Object)
], AppointmentEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
    __metadata("design:type", Boolean)
], AppointmentEntity.prototype, "closed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
    __metadata("design:type", Boolean)
], AppointmentEntity.prototype, "done", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctors_entity_1.DoctorEntity, doctor => doctor.appointments),
    __metadata("design:type", doctors_entity_1.DoctorEntity)
], AppointmentEntity.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservations_entity_1.ReservationEntity, reservation => reservation.appointment),
    __metadata("design:type", reservations_entity_1.ReservationEntity)
], AppointmentEntity.prototype, "reservation", void 0);
exports.AppointmentEntity = AppointmentEntity = __decorate([
    (0, typeorm_1.Entity)()
], AppointmentEntity);
//# sourceMappingURL=appointments.entity.js.map