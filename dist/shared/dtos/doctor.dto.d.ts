import { Binary } from "typeorm";
import { AddWoringHourDto } from "./working-hours.dto";
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
    syndicateNo: string;
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
export declare class DoctorProfileViewerDto {
    viewerId: number;
    viewerIp: number;
}
export declare enum PaymentWay {
    CASH = "cash",
    VESA = "vesa",
    BUCKET = "bucket"
}
declare class ClincForWorkingHourDto {
    name: Localization;
    description: Localization;
    address: ClincAddressDto;
    phone: string;
    whats: string;
    landingPhone: string;
    price: number;
    rePrice: number;
    paymentWay: PaymentWay;
}
export declare class ClincAndWorkingDaysDto {
    clinc: ClincForWorkingHourDto;
    workingHours: AddWoringHourDto[];
}
export declare enum orderKeyEnums {
    RATING = "rating",
    PRICE = "price",
    VISITS = "views"
}
export declare class GetDoctorQueriesDto {
    page?: number;
    limit?: number;
    search?: string;
    orderKey?: orderKeyEnums;
    orderValue?: "ASC" | "DESC";
    governorate?: string;
    center?: string;
    best?: boolean;
    price?: {
        from?: number;
        to?: number;
    };
}
export {};
