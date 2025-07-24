import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DoctorEntity } from "./doctors.entity";
import { ReservationEntity } from "./reservations.entity";

@Entity()
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    day: string;

    @Column({ type: "jsonb", nullable: false })
    time: {
        from: string;
        to: string;
    };

    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column({ type: "boolean", default: false, nullable: true })
    closed: boolean;

    @Column({ type: "boolean", default: false, nullable: true })
    done: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => DoctorEntity, doctor => doctor.appointments)
    doctor: DoctorEntity

    @OneToOne(() => ReservationEntity, reservation => reservation.appointment)
    reservation: ReservationEntity
}


/*
* each appointment just available for one week
   because each week the appointment closed (true => false)
   and its reservation also closed

* done refers too the patient already camed to th clinc
*
*
*/