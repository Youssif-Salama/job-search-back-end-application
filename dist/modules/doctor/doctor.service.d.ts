import { AddDoctorDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
import { PlanService } from '../plan/plan.service';
import { CodeUtilService } from 'src/common/utils/code.util';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CategoryService } from '../category/category.service';
export declare class DoctorService {
    private readonly doctorRepo;
    private readonly credintialService;
    private readonly planService;
    private readonly codeService;
    private readonly emailService;
    private readonly otpService;
    private readonly jwtService;
    private readonly config;
    private readonly bcryptService;
    private readonly categoryService;
    constructor(doctorRepo: Repository<DoctorEntity>, credintialService: CredentialService, planService: PlanService, codeService: CodeUtilService, emailService: MailUtilService, otpService: OtpUtilService, jwtService: JwtUtilService, config: ConfigService, bcryptService: BcryptUtilService, categoryService: CategoryService);
    doctorSignup(data: AddDoctorDto): Promise<DoctorResponseType & {
        token: string;
    }>;
    doctorProfileVerifyAccountEmail(data: doctorProfleVerifeAccountEmailDto): Promise<{
        fullName: string;
        isActive: boolean;
        isVerified: boolean;
    }>;
    doctorLogin(data: LoginDoctorDto): Promise<{
        token: string;
    }>;
    updateMyDoctorProfileRawData(data: DoctorUpdateRawDataDto, doctorId: number): Promise<DoctorResponseType>;
    verifyUpdatedEmail(data: {
        email: string;
        id: number;
    }, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    verifyDoctorEmailAfterUpdateOtp(data: {
        otp: string;
        email: string;
        id: number;
    }): Promise<DoctorResponseType>;
    doctorResetPasswordRequest(data: doctorProfileResetPasswordDto): Promise<{
        fullName: string;
        isActive: boolean;
        isVerified: boolean;
    }>;
    doctorResetPassword(data: doctorProfileResetPasswordDoDto): Promise<{
        message: string;
        fullName: string;
        isActive: true;
        isVerified: true;
    }>;
    doctorProfileChooseCategory(data: doctorProfileChooseCategoryDto, id: number): Promise<DoctorEntity>;
    doctorProfileUpdatePassword(data: updatePasswordDto, id: number): Promise<DoctorEntity>;
}
