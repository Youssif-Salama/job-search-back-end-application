"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const admins_entity_1 = require("../../shared/entities/admins.entity");
const bcrypt_util_1 = require("../../common/utils/bcrypt.util");
const check_pipes_1 = require("../../common/pipes/check.pipes");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const throttle_quard_1 = require("../../common/guards/throttle.quard");
const mail_util_1 = require("../../common/utils/mail.util");
const otp_util_1 = require("../../common/utils/otp.util");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admins_entity_1.AdminEntity]),
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 60000,
                        limit: 10,
                    },
                ],
            })
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, bcrypt_util_1.BcryptUtilService, check_pipes_1.CheckAdminExistPipe, mail_util_1.MailUtilService, otp_util_1.OtpUtilService, jwt_utils_1.JwtUtilService, {
                provide: core_1.APP_GUARD,
                useClass: throttle_quard_1.CustomThrottlerGuard
            }]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map