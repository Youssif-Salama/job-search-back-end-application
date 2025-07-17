import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "jsonb", nullable: false, unique: true })
  title: {
    en: string,
    ar: string
  }

  @Column({ type: "jsonb", nullable: true })
  description: {
    en: string,
    ar: string
  }

  @Column({ type: "jsonb", nullable: false })
  img: {
    url: string,
    public_id: string
  };

  @Column({ type: 'int', nullable: false })
  lsUpBy: number;
}
