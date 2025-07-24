import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, Matches, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CredentialEntity } from "../entities/credentials.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Binary } from "typeorm";

class FullNameDto {
    @ApiProperty({
        description: 'First name of the doctor',
        example: 'Ahmed',
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    fname: string;

    @ApiProperty({
        description: 'Last name of the doctor',
        example: 'Mohamed',
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    lname: string;
}

class AddressDto {
    @ApiProperty({
        description: 'Governorate',
        example: 'Cairo',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    governorate: string;

    @ApiProperty({
        description: 'Center within the governorate',
        example: 'Nasr City',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    center: string;
}

type Localization = {
    en: string;
    ar: string;
}

class ClincAddressDto {
    @ApiProperty({
        description: 'Clinic location link in multiple languages',
        example: { en: 'https://maps.example.com', ar: 'https://خريطة.مثال.كوم' },
        required: true,
        type: Object,
    })
    @IsNotEmpty()
    link: Localization;

    @ApiProperty({
        description: 'Clinic address description in multiple languages',
        example: { en: 'Floor 2, Building 5', ar: 'الطابق الثاني، مبنى 5' },
        required: true,
        type: Object,
    })
    @IsNotEmpty()
    description: Localization;
}

class ClincDto {
    @ApiProperty({
        description: 'Clinic name in multiple languages',
        example: { en: 'Family Clinic', ar: 'عيادة الأسرة' },
        required: true,
        type: Object,
    })
    @IsNotEmpty()
    name: Localization;

    @ApiProperty({
        description: 'Clinic description in multiple languages',
        example: { en: 'We care about your health', ar: 'نحن نهتم بصحتك' },
        required: true,
        type: Object,
    })
    @IsNotEmpty()
    description: Localization;

    @ApiProperty({
        description: 'Clinic address including link and description',
        required: true,
        type: () => ClincAddressDto,
    })
    @ValidateNested()
    @Type(() => ClincAddressDto)
    address: ClincAddressDto;
}

export class AddDoctorDto {
    @ApiProperty({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Doctor phone number',
        example: '01012345678',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Doctor full name (first and last)',
        required: true,
        type: () => FullNameDto,
    })
    @ValidateNested()
    @Type(() => FullNameDto)
    fullName: FullNameDto;

    @ApiProperty({
        description: 'Doctor address including governorate and center',
        required: true,
        type: () => AddressDto,
    })
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @ApiProperty({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

}


export class DoctorFilesDto {
    @IsNotEmpty()
    @ApiProperty({
        name: "card",
        description: "this field refer to doctor's card",
        type: 'string',
        format: 'binary'
    })
    card: Binary;

    @IsNotEmpty()
    @ApiProperty({
        name: 'fid',
        description: 'fid refer to front face of the national id',
        type: 'string',
        format: 'binary'
    })
    fid: Binary;

    @IsNotEmpty()
    @ApiProperty({
        name: 'sid',
        description: 'sid refer to back face of the national id',
        type: 'string',
        format: 'binary'
    })
    sid: Binary
}

export class LoginDoctorDto {
    @ApiProperty({
        name: 'email',
        description: 'Email of the doctor',
        example: 'doctor@gmail.com',
        required: true,
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the doctor',
        example: 'StrongP@ssword1',
        required: true,
        type: String
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class DoctorUpdateRawDataDto {

    @ApiProperty({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Doctor phone number',
        example: '01012345678',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'Doctor full name (first and last)',
        required: true,
        type: () => FullNameDto,
    })
    @ValidateNested()
    @Type(() => FullNameDto)
    fullName: FullNameDto;

    @ApiProperty({
        description: 'Doctor address including governorate and center',
        required: true,
        type: () => AddressDto,
    })
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;

    @ApiProperty({
        description: 'Doctor clinic information',
        required: true,
        type: () => ClincDto,
    })
    @ValidateNested()
    @Type(() => ClincDto)
    clinc: ClincDto;
}

export class doctorProfileResetPasswordDto {
    @ApiProperty({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class doctorProfileResetPasswordDoDto {
    @ApiProperty({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'otp',
        description: 'OTP code for password reset',
        example: '123456',
        required: true,
        type: String
    })
    @IsString()
    @IsNotEmpty()
    otp: string;

    @ApiProperty({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

}

export class doctorProfileChooseCategoryDto {
    @ApiProperty({
        name: 'category id',
        description: 'choosed category id go here',
        type: 'number',
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number
}

export class updatePasswordDto {
    @ApiProperty({
        name: "old password",
        description: "old passwor dgo here",
        type: "string",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty({
        description: 'Doctor password (must be strong)',
        example: 'StrongP@ssword1',
        required: true,
        type: String,
    })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;
}

export class doctorProfleVerifeAccountEmailDto {
    @ApiProperty({
        description: 'Doctor email address',
        example: 'doctor@example.com',
        required: true,
        type: String,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'otp',
        description: 'otp go here',
        required: true,
        type: String
    })
    @IsNotEmpty()
    @IsString()
    otp: string
}