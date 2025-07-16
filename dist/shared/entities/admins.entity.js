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
exports.AdminEntity = void 0;
const typeorm_1 = require("typeorm");
let AdminEntity = class AdminEntity {
    id;
    name;
    email;
    role;
    password;
    isActive;
    isVerified;
    otp;
    pages;
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 250, nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], AdminEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['admin', 'super_admin'],
        default: 'admin',
        nullable: false,
    }),
    __metadata("design:type", String)
], AdminEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "" }),
    __metadata("design:type", String)
], AdminEntity.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], AdminEntity.prototype, "pages", void 0);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`"email" ~* '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'`),
    (0, typeorm_1.Check)(`"password" ~* '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'`)
], AdminEntity);
//# sourceMappingURL=admins.entity.js.map