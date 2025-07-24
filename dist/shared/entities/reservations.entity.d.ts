import { AppointmentEntity } from "./appointments.entity";
import { RateEntity } from "./rates.entity";
export declare class ReservationEntity {
    id: number;
    name: string;
    phone: string;
    description: string;
    code?: {
        code: string;
        used: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
    appointment: AppointmentEntity;
    rate?: RateEntity;
}
