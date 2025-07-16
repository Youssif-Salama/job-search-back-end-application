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
    doctor: DoctorEntity;
    reservation: ReservationEntity;
}
