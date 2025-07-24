import { DoctorEntity } from './doctors.entity';
export declare class CategoryEntity {
    id: number;
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    lsUpBy: number;
    createdAt: Date;
    updatedAt: Date;
    doctors: DoctorEntity[];
}
