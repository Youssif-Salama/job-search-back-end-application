import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, isString, MinLength } from "class-validator"


type ModelType = "doctor" | "admin"
export class ResendOtpCodeDto {
    @ApiProperty({
        name: "email",
        description: "email go here!!",
        type: "string",
        required: false
    })
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiProperty({
        name: "phone",
        description: "phone go here!!",
        type: "string",
        required: false
    })
    @IsPhoneNumber("EG")
    @IsOptional()
    phone?: string

    @ApiProperty({
        name: "model",
        description: "for who u want to resend code!!",
        type: "string",
        required: true
    })
    @IsIn(["doctor", "admin"])
    @IsNotEmpty()
    model: ModelType
}

export class ResendOtpResponseDto {
    name: string;
    email: string;
}

export class ContactUsDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty({
        name: "name",
        description: "your name with min 3 chars",
        type: "string",
        required: true
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        name: "email",
        description: "your email",
        type: "string",
        required: true
    })
    email: string;

    @ApiProperty({
        name: "message",
        description: "your message",
        type: "string",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    message: string;
}