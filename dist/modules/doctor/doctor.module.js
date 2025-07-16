"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModule = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
const doctor_controller_1 = require("./doctor.controller");
const typeorm_1 = require("@nestjs/typeorm");
const doctors_entity_1 = require("../../shared/entities/doctors.entity");
const plan_module_1 = require("../plan/plan.module");
const credential_module_1 = require("../credential/credential.module");
const bcrypt_util_1 = require("../../common/utils/bcrypt.util");
const code_util_1 = require("../../common/utils/code.util");
let DoctorModule = class DoctorModule {
};
exports.DoctorModule = DoctorModule;
exports.DoctorModule = DoctorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([doctors_entity_1.DoctorEntity]), plan_module_1.PlanModule, credential_module_1.CredentialModule],
        controllers: [doctor_controller_1.DoctorController],
        providers: [doctor_service_1.DoctorService, bcrypt_util_1.BcryptUtilService, code_util_1.CodeUtilService]
    })
], DoctorModule);
//# sourceMappingURL=doctor.module.js.map