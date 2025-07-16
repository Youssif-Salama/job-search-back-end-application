import { Pagination } from 'nestjs-typeorm-paginate';
import { addPlanDto, updatePlanDto } from 'src/shared/dtos/plan.dto';
import { PlanEntity } from 'src/shared/entities/plans.entity';
import { Repository } from 'typeorm';
export declare class PlanService {
    private readonly planRepo;
    constructor(planRepo: Repository<PlanEntity>);
    addPlan(data: addPlanDto & {
        lsUpBy: number;
    }): Promise<PlanEntity>;
    updatePlan(data: updatePlanDto & {
        lsUpBy: number;
    }, id: number): Promise<PlanEntity>;
    deletePlan(id: number): Promise<PlanEntity>;
    deleteAllPlans(): Promise<void>;
    getAllPlans(page: number, limit: number, localeCode: string): Promise<Pagination<any>>;
    getOnePlan(id: number, localeCode: string): Promise<any>;
    getTheBasicPlan(): Promise<PlanEntity | false>;
}
