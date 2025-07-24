import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DoctorEntity } from './doctors.entity';
import { RequestEntity } from './requests.entity';

@Entity()
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', nullable: false, unique: true })
  title: {
    en: string;
    ar: string;
  };

  @Column({ type: 'jsonb', nullable: false })
  description: {
    en: string;
    ar: string;
  };

  @Column({ type: 'jsonb', nullable: false })
  price: {
    en: number;
    ar: number;
  };

  @Column({ type: 'int', nullable: false })
  lsUpBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DoctorEntity, doctor => doctor.plan)
  doctors: DoctorEntity[];

  @OneToMany(() => RequestEntity, request => request.plan)
  requests: RequestEntity[];

}
