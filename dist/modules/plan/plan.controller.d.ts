import { addPlanDto, updatePlanDto } from 'src/shared/dtos/plan.dto';
import { PlanService } from './plan.service';
import { PlanEntity } from 'src/shared/entities/plans.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    addPlan(data: addPlanDto, req: Request): Promise<PlanEntity>;
    updatePlan(id: number, data: updatePlanDto, req: Request): Promise<PlanEntity>;
    deletePlan(id: number): Promise<PlanEntity>;
    deleteAllPlans(): Promise<void>;
    getAllPlans(query: {
        page: number;
        limit: number;
    }, req: Request): Promise<Pagination<PlanEntity>>;
    getOnePlan(id: number, req: Request): Promise<PlanEntity>;
}
