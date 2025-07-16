"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const admin_module_1 = require("./modules/admin/admin.module");
const env_config_1 = require("./config/env.config");
const drs_db_1 = require("./db/drs.db");
const plan_module_1 = require("./modules/plan/plan.module");
const path = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const category_module_1 = require("./modules/category/category.module");
const doctor_module_1 = require("./modules/doctor/doctor.module");
const credential_module_1 = require("./modules/credential/credential.module");
const file_module_1 = require("./modules/file/file.module");
let envPath;
switch (process.env.NODE_ENV) {
    case 'production':
        envPath = path.resolve(__dirname, '../../.env.prod');
        break;
    case 'development':
        envPath = path.resolve(__dirname, '../../.env.dev');
        break;
    default:
        envPath = path.resolve(__dirname, '../../.env.dev');
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.default],
                envFilePath: envPath
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (envConfig) => {
                    const user = envConfig.get('envConfig.email.user');
                    const pass = envConfig.get('envConfig.email.pass');
                    console.log({ user, pass });
                    return {
                        transport: {
                            service: 'gmail',
                            auth: {
                                user,
                                pass
                            },
                        },
                        defaults: {
                            from: '"DRS System" <noreply@drs.com>',
                        },
                        template: {
                            dir: path.join(__dirname, '/common/templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    };
                }
            }),
            drs_db_1.DbModule,
            admin_module_1.AdminModule,
            plan_module_1.PlanModule,
            category_module_1.CategoryModule,
            doctor_module_1.DoctorModule,
            credential_module_1.CredentialModule,
            file_module_1.FileModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map