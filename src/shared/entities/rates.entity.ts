import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReservationEntity } from "./reservations.entity";

@Entity()
export class RateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: false })
    comment: string;

    @Column({ type: "int", nullable: false })
    rate: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => ReservationEntity, reservation => reservation.rate)
    @JoinColumn({ name: 'reservationId' })
    reservation: ReservationEntity;
}