import { ReservationEntity } from "./reservations.entity";
export declare class RateEntity {
    id: number;
    comment: string;
    rate: number;
    createdAt: Date;
    updatedAt: Date;
    reservation: ReservationEntity;
}
