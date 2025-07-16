"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModule = void 0;
const common_1 = require("@nestjs/common");
const plan_controller_1 = require("./plan.controller");
const plan_service_1 = require("./plan.service");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("../../guards/auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const plans_entity_1 = require("../../shared/entities/plans.entity");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
let PlanModule = class PlanModule {
};
exports.PlanModule = PlanModule;
exports.PlanModule = PlanModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([plans_entity_1.PlanEntity])],
        controllers: [plan_controller_1.PlanController],
        providers: [
            plan_service_1.PlanService,
            jwt_utils_1.JwtUtilService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [plan_service_1.PlanService, typeorm_1.TypeOrmModule],
    })
], PlanModule);
//# sourceMappingURL=plan.module.js.map