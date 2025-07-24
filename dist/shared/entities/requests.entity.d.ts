import { DoctorEntity } from "./doctors.entity";
import { PlanEntity } from "./plans.entity";
type RequestType = 'new' | 'recharge';
export declare class RequestEntity {
    id: number;
    done: boolean;
    type: RequestType;
    lsUpBy: number;
    createdAt: Date;
    updatedAt: Date;
    plan: PlanEntity;
    doctor: DoctorEntity;
}
export {};
