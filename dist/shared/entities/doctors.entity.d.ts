import { PlanEntity } from './plans.entity';
import { RequestEntity } from './requests.entity';
import { WorkingHoursEntity } from './workinHours.entity';
import { AppointmentEntity } from './appointments.entity';
import { CredentialEntity } from './credentials.entity';
declare class Localization {
    en: string;
    ar: string;
}
export declare class DoctorEntity {
    id: number;
    email: string;
    phone: string;
    isBlocked: boolean;
    isDeleted: boolean;
    img: string;
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
    };
    auth: {
        card: string;
        id: {
            fid: string;
            sid: string;
        };
    };
    lsUpBy: number;
    plan: PlanEntity;
    requests: RequestEntity[];
    workinHours: WorkingHoursEntity[];
    appointments: AppointmentEntity[];
    credential: CredentialEntity;
}
export {};
