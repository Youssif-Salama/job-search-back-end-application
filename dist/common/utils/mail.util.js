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
exports.MailUtilService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let MailUtilService = class MailUtilService {
    mailService;
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMail(data) {
        try {
            const mailOptions = {
                to: data.to,
                subject: data.subject,
            };
            if (data.template) {
                mailOptions.template = data.template;
                mailOptions.context = data.context || {};
            }
            await this.mailService.sendMail(mailOptions);
            console.log("✅ Email sent successfully.");
        }
        catch (error) {
            console.error("❌ Failed to send email:", error);
        }
    }
};
exports.MailUtilService = MailUtilService;
exports.MailUtilService = MailUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailUtilService);
//# sourceMappingURL=mail.util.js.map