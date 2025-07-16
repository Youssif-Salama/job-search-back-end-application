import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReservationEntity } from "./reservations.entity";

@Entity()
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    comment: string;

    @Column({ type: "int", nullable: false })
    rate: number;

    @OneToOne(() => ReservationEntity, reservation => reservation.rate)
    @JoinColumn({ name: 'reservationId' })
    reservation: ReservationEntity;
}