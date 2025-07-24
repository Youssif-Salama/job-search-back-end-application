import { Binary } from "typeorm";
declare class FullNameDto {
    fname: string;
    lname: string;
}
declare class AddressDto {
    governorate: string;
    center: string;
}
type Localization = {
    en: string;
    ar: string;
};
declare class ClincAddressDto {
    link: Localization;
    description: Localization;
}
declare class ClincDto {
    name: Localization;
    description: Localization;
    address: ClincAddressDto;
}
export declare class AddDoctorDto {
    email: string;
    phone: string;
    fullName: FullNameDto;
    address: AddressDto;
    password: string;
}
export declare class DoctorFilesDto {
    card: Binary;
    fid: Binary;
    sid: Binary;
}
export declare class LoginDoctorDto {
    email: string;
    password: string;
}
export declare class DoctorUpdateRawDataDto {
    email: string;
    phone: string;
    fullName: FullNameDto;
    address: AddressDto;
    clinc: ClincDto;
}
export declare class doctorProfileResetPasswordDto {
    email: string;
}
export declare class doctorProfileResetPasswordDoDto {
    email: string;
    otp: string;
    password: string;
}
export declare class doctorProfileChooseCategoryDto {
    categoryId: number;
}
export declare class updatePasswordDto {
    oldPassword: string;
    password: string;
}
export declare class doctorProfleVerifeAccountEmailDto {
    email: string;
    otp: string;
}
export {};
