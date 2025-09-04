import { AddDoctorDto, ClincAndWorkingDaysDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, DoctorProfileViewerDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, GetDoctorQueriesDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorService } from './doctor.service';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { Request, Response } from 'express';
import { DoctorEntity, FileClass } from 'src/shared/entities/doctors.entity';
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
        doctor: {
            name: {
                fname: string;
                lname: string;
            };
            email: string;
            img: string | FileClass;
        };
    }>;
    addClincAndWorkingHours(data: ClincAndWorkingDaysDto, req: Request): Promise<{
        doctor: DoctorEntity;
        workingHours: import("../../shared/entities/workinHours.entity").WorkingHoursEntity[];
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
    chooseCategory(data: doctorProfileChooseCategoryDto, req: Request): Promise<DoctorEntity>;
    doctorProfileUpdatePassword(data: updatePasswordDto, req: Request): Promise<DoctorEntity>;
    doctorProfileView(id: string, data: DoctorProfileViewerDto): Promise<void>;
    getMyData(req: Request): Promise<DoctorEntity>;
    getAllDoctors(queries: GetDoctorQueriesDto): Promise<import("nestjs-typeorm-paginate").Pagination<DoctorEntity, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    handleBlockDoctor(id: string): Promise<{
        name: {
            fname: string;
            lname: string;
        };
        email: string;
        isActive: boolean;
    }>;
}
