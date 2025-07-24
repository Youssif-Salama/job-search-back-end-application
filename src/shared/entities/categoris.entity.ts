import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DoctorEntity } from './doctors.entity';

@Entity()
export class CategoryEntity {
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

  @Column({ type: 'int', nullable: false })
  lsUpBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DoctorEntity, doctor => doctor.category)
  doctors: DoctorEntity[];
}