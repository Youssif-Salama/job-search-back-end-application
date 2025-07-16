import { BlockAdminDtoResponse, CreateAdminDto, getAllAdminsQueryDto, LoginAdminDto, LoginAdminRequestDto, LoginRequestResponseDto, ResetPasswordDto, ResetPasswordRequestDto, SignupResponseDto, updateMyAdminDataDto, UpdateMyAdminDataResponseDto, UpdatePagesDto, updatePagesResponseDto, VerifyAdminDtoResponse, VerifyAdminSignupDto } from 'src/shared/dtos/admin.dto';
import { AdminService } from './admin.service';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
export declare class AdminController {
    private readonly adminService;
    private readonly jwtService;
    constructor(adminService: AdminService, jwtService: JwtUtilService);
    create(data: CreateAdminDto): Promise<SignupResponseDto>;
    verifySignup(data: VerifyAdminSignupDto): Promise<SignupResponseDto>;
    logAdminRequest(data: LoginAdminRequestDto): Promise<LoginRequestResponseDto>;
    login(data: LoginAdminDto): Promise<{
        token: string;
    }>;
    resetPasswordRequest(data: ResetPasswordRequestDto): Promise<{}>;
    resetPassword(data: ResetPasswordDto): Promise<{}>;
    updateMyAdminData(data: updateMyAdminDataDto, req: any): Promise<UpdateMyAdminDataResponseDto>;
    blockAdmin(id: number): Promise<BlockAdminDtoResponse>;
    updatePages(data: UpdatePagesDto, id: number): Promise<updatePagesResponseDto>;
    verifyAdmin(id: number): Promise<VerifyAdminDtoResponse>;
    verifyAccountIfUpdated(token: string, res: any): Promise<UpdateMyAdminDataResponseDto>;
    getMyAdminData(req: any): Promise<import("../../shared/entities/admins.entity").AdminEntity>;
    getAll(queries: getAllAdminsQueryDto): Promise<import("nestjs-typeorm-paginate").Pagination<import("../../shared/entities/admins.entity").AdminEntity, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOne(id: string): Promise<import("../../shared/entities/admins.entity").AdminEntity>;
}
