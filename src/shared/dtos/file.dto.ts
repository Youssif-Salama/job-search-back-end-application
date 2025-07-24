import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Binary } from "typeorm";

// doctor
export class DoctorProfileImgDto {
    @ApiProperty({
        type: "string",
        format: "binary",
        name: "img",
        description: "doctor profile image"
    })
    @IsNotEmpty()
    img: Binary;
}


export class DoctorProfileAuthFiles {

    @ApiProperty({
        type: "string",
        format: "binary",
        name: "card",
        description: "كارت النقابه"
    })
    @IsNotEmpty()
    card: Binary;

    @ApiProperty({
        type: "string",
        format: "binary",
        name: "fid",
        description: "front face of identity"
    })
    @IsNotEmpty()
    fid: Binary;

    @ApiProperty({
        type: "string",
        format: "binary",
        name: "sid",
        description: "back face of identity"
    })
    @IsNotEmpty()
    sid: Binary
}




export class DoctorProfileAuthUpdateFiles {
    @ApiProperty({
        type: "string",
        format: "binary",
        name: "card",
        description: "كارت النقابه",
        required: false
    })
    card?: Binary;

    @ApiProperty({
        type: "string",
        format: "binary",
        name: "fid",
        description: "front face of identity",
        required: false
    })
    fid?: Binary;

    @ApiProperty({
        type: "string",
        format: "binary",
        name: "sid",
        description: "back face of identity",
        required: false
    })
    sid?: Binary;
}


