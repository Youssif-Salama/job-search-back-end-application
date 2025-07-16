"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plans_entity_1 = require("../../shared/entities/plans.entity");
const typeorm_2 = require("typeorm");
let PlanService = class PlanService {
    planRepo;
    constructor(planRepo) {
        this.planRepo = planRepo;
    }
    addPlan(data) {
        const { title, description, price, lsUpBy } = data;
        const addNewPlan = this.planRepo.create({ title, description, price, lsUpBy });
        return this.planRepo.save(addNewPlan);
    }
    async updatePlan(data, id) {
        const plan = await this.planRepo.findOneBy({ id });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        const updated = this.planRepo.merge(plan, data);
        return this.planRepo.save(updated);
    }
    async deletePlan(id) {
        const plan = await this.planRepo.findOneBy({ id });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        return this.planRepo.remove(plan);
    }
    async deleteAllPlans() {
        return this.planRepo.clear();
    }
    async getAllPlans(page, limit, localeCode) {
        const queryBuilder = this.planRepo
            .createQueryBuilder('plan')
            .select([
            'plan.id',
            `plan.title ->> :localeCode AS title`,
            `plan.description ->> :localeCode AS description`,
            `plan.price ->> :localeCode AS price`,
        ])
            .setParameters({ localeCode });
        const [rawData, count] = await Promise.all([
            queryBuilder
                .offset((page - 1) * limit)
                .limit(limit)
                .getRawMany(),
            this.planRepo.count(),
        ]);
        console.log(count);
        const items = rawData.map(plan => ({
            id: plan.id,
            title: plan.title,
            description: plan.description,
            price: parseFloat(plan.price),
        }));
        return {
            items,
            meta: {
                totalItems: count,
                itemCount: items.length,
                itemsPerPage: limit,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            },
        };
    }
    async getOnePlan(id, localeCode) {
        const plan = await this.planRepo
            .createQueryBuilder('plan')
            .select([
            'plan.id',
            `plan.title ->> :localeCode AS title`,
            `plan.description ->> :localeCode AS description`,
            `plan.price ->> :localeCode AS price`,
        ])
            .where('plan.id = :id', { id })
            .setParameters({ localeCode })
            .getRawOne();
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        return {
            id: plan.id,
            title: plan.title,
            description: plan.description,
            price: parseFloat(plan.price),
        };
    }
    async getTheBasicPlan() {
        const plan = await this.planRepo.createQueryBuilder('plan')
            .orderBy(`(plan.price ->> 'en')::numeric`, "ASC")
            .limit(1)
            .getOne();
        if (!plan)
            return false;
        return plan;
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plans_entity_1.PlanEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanService);
//# sourceMappingURL=plan.service.js.map