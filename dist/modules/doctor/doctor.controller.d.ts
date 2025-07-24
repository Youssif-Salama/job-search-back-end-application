import { AddDoctorDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorService } from './doctor.service';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { Response } from 'express';
export declare class DoctorController {
    private readonly doctorService;
    private readonly jwtService;
    constructor(doctorService: DoctorService, jwtService: JwtUtilService);
    doctorSignup(data: AddDoctorDto): Promise<DoctorResponseType>;
    doctorProfileVerifyAccountEmail(data: doctorProfleVerifeAccountEmailDto): Promise<{
        fullName: string;
        isActive: boolean;
        isVerified: boolean;
    }>;
    doctorLogin(data: LoginDoctorDto): Promise<{
        token: string;
    }>;
    updateMyDoctorProfileRawData(data: DoctorUpdateRawDataDto, req: Request): Promise<DoctorResponseType>;
    verifyUpdatedEmail(res: Response, token: string): Promise<Response<any, Record<string, any>> | undefined>;
    verifyDoctorEmailAfterUpdateOtp(otp: string, token: string): Promise<DoctorResponseType>;
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
    chooseCategory(data: doctorProfileChooseCategoryDto, req: Request): Promise<import("../../shared/entities/doctors.entity").DoctorEntity>;
    doctorProfileUpdatePassword(data: updatePasswordDto, req: Request): Promise<import("../../shared/entities/doctors.entity").DoctorEntity>;
}
