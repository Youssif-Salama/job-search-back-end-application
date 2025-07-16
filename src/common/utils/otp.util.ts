import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpUtilService {

    generateAlphaOtp(length: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return this.generateOtpFromCharset(chars, length);
    }

    generateNumericOtp(length: number): string {
        const digits = '0123456789';
        return this.generateOtpFromCharset(digits, length);
    }

    generateComplexOtp(length: number): string {
        const fullSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        return this.generateOtpFromCharset(fullSet, length);
    }

    private generateOtpFromCharset(charset: string, length: number): string {
        let otp = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            otp += charset[randomIndex];
        }
        return otp;
    }
}
