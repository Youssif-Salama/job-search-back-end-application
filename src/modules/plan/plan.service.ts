import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { addPlanDto, updatePlanDto } from 'src/shared/dtos/plan.dto';
import { PlanEntity } from 'src/shared/entities/plans.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepo: Repository<PlanEntity>,
  ) { }
  addPlan(data: addPlanDto & { lsUpBy: number }): Promise<PlanEntity> {
    const { title, description, price, lsUpBy } = data;
    const addNewPlan = this.planRepo.create({ title, description, price, lsUpBy });
    return this.planRepo.save(addNewPlan);
  }
  async updatePlan(data: updatePlanDto & { lsUpBy: number }, id: number): Promise<PlanEntity> {
    const plan = await this.planRepo.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    const updated = this.planRepo.merge(plan, data);
    return this.planRepo.save(updated);
  }

  async deletePlan(id: number): Promise<PlanEntity> {
    const plan = await this.planRepo.findOneBy({ id });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    return this.planRepo.remove(plan);
  }
  async deleteAllPlans(): Promise<void> {
    return this.planRepo.clear();
  }

  async getAllPlans(
    page: number,
    limit: number,
    localeCode: string,
  ): Promise<Pagination<any>> {
    if (!localeCode) {
      const plansQuery = this.planRepo.createQueryBuilder('plan').
        select(['plan.id', 'plan.title', 'plan.description', 'plan.price'])
        .orderBy('plan.id', 'ASC');
      return paginate<PlanEntity>(plansQuery, { page, limit, route: '/plan' });
    }
    else {
      const queryBuilder = this.planRepo
        .createQueryBuilder('plan')
        .select([
          'plan.id AS id',
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
  }



  async getOnePlan(id: number, localeCode: string): Promise<any> {
    if (!localeCode) {
      const plan = await this.planRepo.findOneBy({ id });
      if (!plan) {
        throw new NotFoundException('Plan not found');
      }
      return {
        id: plan.id,
        title: plan.title,
        description: plan.description,
        price: plan.price
      };
    }
    const plan = await this.planRepo
      .createQueryBuilder('plan')
      .select([
        'plan.id AS id',
        `plan.title ->> :localeCode AS title`,
        `plan.description ->> :localeCode AS description`,
        `plan.price ->> :localeCode AS price`,
      ])
      .where('plan.id = :id', { id })
      .setParameters({ localeCode }) 
      .getRawOne();

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    return {
      id: plan.id,
      title: plan.title,
      description: plan.description,
      price: parseFloat(plan.price),
    };
  }

  async getTheBasicPlan(): Promise<PlanEntity | false> {
    const plan = await this.planRepo.createQueryBuilder('plan')
      .orderBy(`(plan.price ->> 'en')::numeric`, "ASC")
      .limit(1)
      .getOne()
    if (!plan) return false;
    return plan;
  }
}
