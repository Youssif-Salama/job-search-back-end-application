import { DoctorEntity } from "./doctors.entity";
export declare class CredentialEntity {
    id: number;
    password: string;
    credits: number;
    createdAt: Date;
    updatedAt: Date;
    doctor: DoctorEntity;
}
