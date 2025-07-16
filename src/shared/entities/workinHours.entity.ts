import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorEntity } from "./doctors.entity";

type DaysEn = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
type DaysAr = 'السبت' | 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس' | 'الجمعة';

@Entity()
export class WorkingHoursEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "jsonb", nullable: false })
    day: {
        en: DaysEn;
        ar: DaysAr;
    };

    @Column({ type: "jsonb", nullable: false })
    time: {
        from: string;
        to: string;
    };

    @ManyToOne(() => DoctorEntity, doctor => doctor.workinHours)
    @JoinColumn({ name: 'doctorId' })
    doctor: DoctorEntity
}
