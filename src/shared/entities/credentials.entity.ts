import { Check, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorEntity } from "./doctors.entity";

@Entity()
@Check(`"password" ~* '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'`)
export class CredentialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'int', nullable: false, default: 30 })
    credits: number;

    @OneToOne(() => DoctorEntity, doctor => doctor.credential)
    doctor: DoctorEntity;
}
