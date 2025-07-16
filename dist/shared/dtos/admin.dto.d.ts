export declare class CreateAdminDto {
    name: string;
    password: string;
    email: string;
}
export declare class LoginAdminDto {
    email: string;
    password: string;
    otp: string;
}
export declare class LoginAdminRequestDto {
    email: string;
}
export declare class SignupResponseDto {
    name: string;
    role: 'admin' | 'super_admin';
}
export declare class LoginRequestResponseDto {
    name: string;
    role: 'admin' | 'super_admin';
}
export declare class UpdateMyAdminDataResponseDto {
    name: string;
    role: 'admin' | 'super_admin';
}
export declare class VerifyAdminSignupDto {
    email: string;
    otp: string;
}
export declare class ResetPasswordRequestDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    password: string;
    otp: string;
}
export declare class updateMyAdminDataDto {
    name: string;
    password: string;
    email: string;
}
export declare class BlockAdminDtoResponse {
    name: string;
    isActive: boolean;
    role: 'admin' | 'super_admin';
}
export declare class VerifyAdminDtoResponse {
    name: string;
    role: 'admin' | 'super_admin';
    isVerified: boolean;
}
type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type pagesPermision = {
    [pageName: string]: HttpMethod[];
};
export declare class UpdatePagesDto {
    pages: pagesPermision;
}
export declare class updatePagesResponseDto {
    pages: pagesPermision;
    name: string;
    role: 'admin' | 'super_admin';
}
export declare class getAllAdminsQueryDto {
    page: number;
    sorting: "ASC" | "DESC";
    limit?: number;
    isActive?: boolean;
    isVerified?: boolean;
    search?: string;
}
export {};
