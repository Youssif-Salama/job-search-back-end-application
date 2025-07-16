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
exports.JwtUtilService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt = require("jsonwebtoken");
let JwtUtilService = class JwtUtilService {
    envConfig;
    constructor(envConfig) {
        this.envConfig = envConfig;
    }
    generateToken(data, expiresIn) {
        return jwt.sign(data, this.envConfig.get('envConfig.jwt.pass'), {
            expiresIn: expiresIn || this.envConfig.get('envConfig.jwt.exp'),
        });
    }
    verifyToken(token) {
        return jwt.verify(token, this.envConfig.get('envConfig.jwt.pass'));
    }
    decodeToken(token) {
        return jwt.decode(token);
    }
};
exports.JwtUtilService = JwtUtilService;
exports.JwtUtilService = JwtUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtUtilService);
//# sourceMappingURL=jwt.utils.js.map