import { ReservationEntity } from "./reservations.entity";
export declare class RateEntity {
    id: number;
    comment: string;
    rate: number;
    reservation: ReservationEntity;
}
