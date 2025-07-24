import { PlanEntity } from './plans.entity';
import { RequestEntity } from './requests.entity';
import { WorkingHoursEntity } from './workinHours.entity';
import { AppointmentEntity } from './appointments.entity';
import { CredentialEntity } from './credentials.entity';
import { CategoryEntity } from './categoris.entity';
declare class Localization {
    en: string;
    ar: string;
}
export interface FileClass {
    public_id: string;
    url: string;
}
export declare class DoctorEntity {
    id: number;
    email: string;
    phone: string;
    isDeleted: boolean;
    img: FileClass;
    fullName: {
        fname: string;
        lname: string;
    };
    address: {
        governorate: string;
        center: string;
    };
    code?: {
        code: string;
        count: number;
    };
    clinc: {
        name: Localization;
        description: Localization;
        address: {
            link: Localization;
            description: Localization;
        };
        imgs: FileClass[];
    };
    auth: {
        card: FileClass;
        id: {
            fid: FileClass;
            sid: FileClass;
        };
    };
    isActive: boolean;
    isVerified: boolean;
    otp: string;
    createdAt: Date;
    updatedAt: Date;
    lsUpBy: number;
    plan: PlanEntity;
    category: CategoryEntity;
    requests: RequestEntity[];
    workinHours: WorkingHoursEntity[];
    appointments: AppointmentEntity[];
    credential: CredentialEntity;
}
export {};
