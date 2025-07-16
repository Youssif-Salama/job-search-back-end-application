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
exports.RateEntity = void 0;
const typeorm_1 = require("typeorm");
const reservations_entity_1 = require("./reservations.entity");
let RateEntity = class RateEntity {
    id;
    comment;
    rate;
    reservation;
};
exports.RateEntity = RateEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], RateEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], RateEntity.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => reservations_entity_1.ReservationEntity, reservation => reservation.rate),
    (0, typeorm_1.JoinColumn)({ name: 'reservationId' }),
    __metadata("design:type", reservations_entity_1.ReservationEntity)
], RateEntity.prototype, "reservation", void 0);
exports.RateEntity = RateEntity = __decorate([
    (0, typeorm_1.Entity)()
], RateEntity);
//# sourceMappingURL=rates.entity.js.map