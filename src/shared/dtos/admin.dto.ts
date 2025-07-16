import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'admin name',
    example: 'admin',
    required: true,
    type: String,
  })
  @MinLength(3)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'admin email',
    example: 'admin@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;
}

export class LoginAdminDto {
  @ApiProperty({
    description: 'admin email',
    example: 'admin@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'OTP sent to admin email',
    example: '123456',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  otp: string;
}


export class LoginAdminRequestDto {
  @ApiProperty({
    description: 'admin email',
    example: 'admin@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;
}


export class SignupResponseDto {
  name: string;
  role: 'admin' | 'super_admin';
}

export class LoginRequestResponseDto {
  name: string;
  role: 'admin' | 'super_admin';
}

export class UpdateMyAdminDataResponseDto {
  name: string;
  role: 'admin' | 'super_admin';
}

export class VerifyAdminSignupDto {
  @ApiProperty({
    description: 'admin email',
    example: 'admin@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'OTP sent to admin email',
    example: '123456',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  otp: string;
}


export class ResetPasswordRequestDto {
  @ApiProperty({
    name: "email",
    description: "email of admin",
    example: "admin@gmail.com",
    required: true,
    type: "string"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    name: "email",
    description: "email of admin",
    example: "admin@gmail.com",
    required: true,
    type: "string"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'OTP sent to admin email',
    example: '123456',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  otp: string;
}


export class updateMyAdminDataDto {
  @ApiProperty({
    description: 'admin name',
    example: 'admin',
    required: true,
    type: String,
  })
  @MinLength(3)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    description: 'admin password',
    example: 'password@0001',
    required: true,
    type: String,
  })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'admin email',
    example: 'admin@gmail.com',
    required: true,
    type: String,
  })
  @IsEmail()
  email: string;
}

export class BlockAdminDtoResponse {
  name: string;
  isActive: boolean;
  role: 'admin' | 'super_admin';
}


export class VerifyAdminDtoResponse {
  name: string;
  role: 'admin' | 'super_admin';
  isVerified: boolean;
}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type pagesPermision = {
  [pageName: string]: HttpMethod[]
}

export class UpdatePagesDto {
  @ApiProperty({
    type: Object,
    example: {
      "home": ["get", "post"]
    },
    required: true
  })
  @IsNotEmpty()
  pages: pagesPermision
}

export class updatePagesResponseDto {
  pages: pagesPermision;
  name: string;
  role: 'admin' | 'super_admin'
}

export class getAllAdminsQueryDto {
  @ApiProperty({
    name: "page",
    description: "page number",
    required: false,
    type: "number",
    default: 1
  })
  @IsOptional()
  page: number;

  @ApiProperty({
    name: "sorting",
    type: "string",
    enum: ["ASC", "DESC"],
    default: "ASC",
    required: false
  })
  @IsEnum(["ASC", "DESC"])
  @IsOptional()
  sorting: "ASC" | "DESC";

  @ApiProperty({
    name: "limit",
    required: false,
    type: "number",
    default: 10
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    name: "isActive",
    required: false,
    type: "boolean"
  })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    name: "isVerified",
    required: false,
    type: "boolean"
  })
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({
    name: "search",
    required: false,
    type: "string"
  })
  @IsOptional()
  search?: string;
}