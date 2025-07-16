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
exports.BcryptUtilService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
let BcryptUtilService = class BcryptUtilService {
    envConfig;
    constructor(envConfig) {
        this.envConfig = envConfig;
    }
    bcryptHashingUtil(password) {
        const saltRounds = this.envConfig.get('envConfig.bcrypt.salting') ?? 10;
        return bcrypt.hashSync(password, +saltRounds);
    }
    bcryptCompareUtil(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
};
exports.BcryptUtilService = BcryptUtilService;
exports.BcryptUtilService = BcryptUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BcryptUtilService);
//# sourceMappingURL=bcrypt.util.js.map