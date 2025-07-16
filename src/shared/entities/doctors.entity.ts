import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plans.entity';
import { RequestEntity } from './requests.entity';
import { WorkingHoursEntity } from './workinHours.entity';
import { AppointmentEntity } from './appointments.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { CredentialEntity } from './credentials.entity';


class Localization {
    @IsString()
    @IsNotEmpty()
    en: string;

    @IsString()
    @IsNotEmpty()
    ar: string;
}

@Entity()
@Check(`"email" ~* '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'`)
@Check(`"phone" ~* '^(010|011|012|015)\\d{8}$'`)
export class DoctorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    phone: string;

    @Column({ type: 'boolean', default: false })
    isBlocked: boolean;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;

    @Column({ type: 'varchar' })
    img: string;

    @Column({ type: 'jsonb', nullable: false })
    fullName: {
        fname: string;
        lname: string;
    };

    @Column({ type: 'jsonb', nullable: false })
    address: {
        governorate: string;
        center: string;
    };

    @Column({ type: 'jsonb', nullable: true })
    code?: {
        code: string;
        count: number;
    };

    @Column({ type: 'jsonb', nullable: false })
    clinc: {
        name: Localization;
        description: Localization;
        address: {
            link: Localization;
            description: Localization;
        };
    };

    @Column({ type: 'jsonb', nullable: false })
    auth: {
        card: string;
        id: {
            fid: string;
            sid: string;
        };
    };

    @Column({ type: 'int', nullable: false })
    lsUpBy: number;

    @ManyToOne(() => PlanEntity, plan => plan.doctors)
    plan: PlanEntity;

    @OneToMany(() => RequestEntity, request => request.doctor)
    requests: RequestEntity[];

    @OneToMany(() => WorkingHoursEntity, workinHours => workinHours.doctor)
    workinHours: WorkingHoursEntity[]

    @OneToMany(() => AppointmentEntity, appointment => appointment.doctor)
    appointments: AppointmentEntity[]

    @OneToOne(() => CredentialEntity, credential => credential.doctor, { cascade: true })
    @JoinColumn()
    credential: CredentialEntity;

}
