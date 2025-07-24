import { DoctorEntity } from "./doctors.entity";
type DaysEn = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
type DaysAr = 'السبت' | 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس' | 'الجمعة';
export declare class WorkingHoursEntity {
    id: number;
    day: {
        en: DaysEn;
        ar: DaysAr;
    };
    time: {
        from: string;
        to: string;
    };
    createdAt: Date;
    updatedAt: Date;
    doctor: DoctorEntity;
}
export {};
