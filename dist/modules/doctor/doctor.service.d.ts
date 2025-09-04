import { AddDoctorDto, ClincAndWorkingDaysDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, DoctorProfileViewerDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, GetDoctorQueriesDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity, FileClass } from 'src/shared/entities/doctors.entity';
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
import { WorkingHoursEntity } from 'src/shared/entities/workinHours.entity';
export declare class DoctorService {
    private readonly doctorRepo;
    private readonly workingHoursRepo;
    private readonly credintialService;
    private readonly planService;
    private readonly codeService;
    private readonly emailService;
    private readonly otpService;
    private readonly jwtService;
    private readonly config;
    private readonly bcryptService;
    private readonly categoryService;
    constructor(doctorRepo: Repository<DoctorEntity>, workingHoursRepo: Repository<WorkingHoursEntity>, credintialService: CredentialService, planService: PlanService, codeService: CodeUtilService, emailService: MailUtilService, otpService: OtpUtilService, jwtService: JwtUtilService, config: ConfigService, bcryptService: BcryptUtilService, categoryService: CategoryService);
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
        doctor: {
            name: {
                fname: string;
                lname: string;
            };
            email: string;
            img: string | FileClass;
        };
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
    doctorProfileView(viewedDoctorId: number, data: DoctorProfileViewerDto): Promise<void>;
    getMyData(id: number): Promise<DoctorEntity>;
    clincAndWorkingDays(data: ClincAndWorkingDaysDto, doctorId: number): Promise<{
        doctor: DoctorEntity;
        workingHours: WorkingHoursEntity[];
    }>;
    getAllDoctors(queryObj: GetDoctorQueriesDto): Promise<import("nestjs-typeorm-paginate").Pagination<DoctorEntity, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    handleBlockDoctor(idNo: number): Promise<{
        name: {
            fname: string;
            lname: string;
        };
        email: string;
        isActive: boolean;
    }>;
}
