type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type pagesPermision = {
    [pageName: string]: HttpMethod[];
};
export declare class AdminEntity {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'super_admin';
    password: string;
    isActive: boolean;
    isVerified: boolean;
    otp: string;
    pages: pagesPermision;
    createdAt: Date;
    updatedAt: Date;
}
export {};
