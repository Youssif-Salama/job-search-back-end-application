import { Check, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppointmentEntity } from "./appointments.entity";
import { RateEntity } from "./rates.entity";

@Entity()
@Check(`"phone" ~* '^(010|011|012|015)\\d{8}$'`)
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false })
    phone: string;

    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column({ type: "jsonb", nullable: true })
    code?: {
        code: string;
        used: boolean;
    };

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => AppointmentEntity, appoinment => appoinment.reservation)

    @JoinColumn({ name: 'appointmentId' })
    appointment: AppointmentEntity;


    @OneToOne(() => RateEntity, rate => rate.reservation, { nullable: true })
    rate?: RateEntity;

}
