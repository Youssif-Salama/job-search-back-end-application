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
    clinc: ClincDto;
    password: string;
}
export declare class DoctorFilesDto {
    card: Binary;
    fid: Binary;
    sid: Binary;
}
export {};
