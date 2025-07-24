import { DoctorEntity } from './doctors.entity';
import { RequestEntity } from './requests.entity';
export declare class PlanEntity {
    id: number;
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    price: {
        en: number;
        ar: number;
    };
    lsUpBy: number;
    createdAt: Date;
    updatedAt: Date;
    doctors: DoctorEntity[];
    requests: RequestEntity[];
}
