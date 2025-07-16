"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("../../guards/auth.guard");
const typeorm_1 = require("@nestjs/typeorm");
const categoris_entity_1 = require("../../shared/entities/categoris.entity");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
let CategoryModule = class CategoryModule {
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([categoris_entity_1.CategoryEntity])],
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_1.CategoryService,
            jwt_utils_1.JwtUtilService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map