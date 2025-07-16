import { DoctorEntity } from "./doctors.entity";
export declare class CredentialEntity {
    id: number;
    password: string;
    credits: number;
    doctor: DoctorEntity;
}
