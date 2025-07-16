import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

type DataType = {
    to: string;
    subject: string;
    template?: string;
    context?: {
        [key: string]: any;
    };
};

@Injectable()
export class MailUtilService {
    constructor(private readonly mailService: MailerService) { }

    async sendMail(data: DataType): Promise<void> {
        try {
            const mailOptions: any = {
                to: data.to,
                subject: data.subject,
            };

            if (data.template) {
                mailOptions.template = data.template;
                mailOptions.context = data.context || {};
            }

            await this.mailService.sendMail(mailOptions);
            console.log("✅ Email sent successfully.");
        } catch (error) {
            console.error("❌ Failed to send email:", error);
        }
    }
}
