import { DoctorEntity } from "./doctors.entity";
import { ReservationEntity } from "./reservations.entity";
export declare class AppointmentEntity {
    id: number;
    day: string;
    time: {
        from: string;
        to: string;
    };
    description: string;
    closed: boolean;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    doctor: DoctorEntity;
    reservation: ReservationEntity;
}
