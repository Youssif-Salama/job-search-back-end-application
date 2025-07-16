import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorEntity } from "./doctors.entity";
import { PlanEntity } from "./plans.entity";


type RequestType = 'new' | 'recharge';


@Entity()
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: false })
    done: boolean;

    @Column({ type: 'varchar' })
    type: RequestType;

    @Column({ type: 'int', nullable: false })
    lsUpBy: number;

    @ManyToOne(() => PlanEntity, plan => plan.requests)
    @JoinColumn({ name: 'planId' })
    plan: PlanEntity;

    @ManyToOne(() => DoctorEntity, doctor => doctor.requests)
    @JoinColumn({ name: 'doctorId' })
    doctor: DoctorEntity;
}
