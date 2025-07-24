import { Entity, Column, PrimaryGeneratedColumn, Check, CreateDateColumn, UpdateDateColumn } from 'typeorm';


type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
type pagesPermision = {
  [pageName: string]: HttpMethod[]
}



@Entity()
@Check(`"email" ~* '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'`)
@Check(`"password" ~* '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'`)
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 250, nullable: false, type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'super_admin'],
    default: 'admin',
    nullable: false,
  })
  role: 'admin' | 'super_admin';

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: "varchar", default: "" })
  otp: string;

  @Column({ type: "jsonb", nullable: true })
  pages: pagesPermision

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

