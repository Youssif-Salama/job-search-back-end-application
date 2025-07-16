import { MailerService } from "@nestjs-modules/mailer";
type DataType = {
    to: string;
    subject: string;
    template?: string;
    context?: {
        [key: string]: any;
    };
};
export declare class MailUtilService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail(data: DataType): Promise<void>;
}
export {};
