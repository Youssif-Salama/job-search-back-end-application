import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { DoctorEntity } from "../entities/doctors.entity";

export class CreateCredentialDto {
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsNotEmpty()
    doctor: DoctorEntity;
}