import { ConfigService } from '@nestjs/config';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { BlockAdminDtoResponse, CreateAdminDto, getAllAdminsQueryDto, LoginAdminDto, LoginAdminRequestDto, LoginRequestResponseDto, ResetPasswordDto, ResetPasswordRequestDto, SignupResponseDto, updateMyAdminDataDto, UpdateMyAdminDataResponseDto, UpdatePagesDto, updatePagesResponseDto, VerifyAdminDtoResponse, VerifyAdminSignupDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly adminRepo;
    private readonly bcryptService;
    private readonly jwtService;
    private readonly mailService;
    private readonly otpService;
    private readonly configService;
    constructor(adminRepo: Repository<AdminEntity>, bcryptService: BcryptUtilService, jwtService: JwtUtilService, mailService: MailUtilService, otpService: OtpUtilService, configService: ConfigService);
    createAdmin(data: CreateAdminDto): Promise<SignupResponseDto>;
    verifyAdminSignup(data: VerifyAdminSignupDto): Promise<SignupResponseDto>;
    loginAdminRequest(data: LoginAdminRequestDto): Promise<LoginRequestResponseDto>;
    loginAdmin(data: LoginAdminDto): Promise<{
        token: string;
    }>;
    resetPasswordRequest(data: ResetPasswordRequestDto): Promise<{}>;
    resetPassword(data: ResetPasswordDto): Promise<{}>;
    updateMyAdminData(data: updateMyAdminDataDto, id: number): Promise<UpdateMyAdminDataResponseDto>;
    verifyAccountIfUpdated(data: {
        otp: string;
        email: string;
    }): Promise<UpdateMyAdminDataResponseDto>;
    getMyAdminData(id: number): Promise<AdminEntity>;
    blockAdmin(id: number): Promise<BlockAdminDtoResponse>;
    verifyAdmin(id: number): Promise<VerifyAdminDtoResponse>;
    updatePages(data: UpdatePagesDto, id: number): Promise<updatePagesResponseDto>;
    getOneAdmin(id: number): Promise<AdminEntity>;
    getAllAdmins(queries: getAllAdminsQueryDto): Promise<Pagination<AdminEntity>>;
}
