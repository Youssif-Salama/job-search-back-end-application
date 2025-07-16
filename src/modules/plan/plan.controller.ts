import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Put,
  Get,
  Param,
  HttpCode,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { addPlanDto, updatePlanDto } from 'src/shared/dtos/plan.dto';
import { PlanService } from './plan.service';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PlanEntity } from 'src/shared/entities/plans.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/common/decorators/public.decorator';
import LocalizationInterceptor from 'src/common/interceptors/localization.interceptor';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) { }

  @Post()
  @ApiBearerAuth('access-token')
  addPlan(@Body() data: addPlanDto,@Req() req:Request ): Promise<PlanEntity> {
    const { price } = data;
    if (price.en !== price.ar) {
      throw new BadRequestException('price and price_ar should be same');
    }
    return this.planService.addPlan({...data,lsUpBy:req['user']?.id});
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Put(':id')
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  updatePlan(
    @Param('id') id: number,
    @Body() data: updatePlanDto,
    @Req() req:Request
  ): Promise<PlanEntity> {
    if (data.price?.en !== data.price?.ar) {
      throw new BadRequestException('price and price_ar should be same');
    }
    return this.planService.updatePlan({...data,lsUpBy:req['user']?.id}, +id);
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  deletePlan(@Param('id') id: number): Promise<PlanEntity> {
    return this.planService.deletePlan(+id);
  }

  @Delete()
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  deleteAllPlans(): Promise<void> {
    return this.planService.deleteAllPlans();
  }

  @Public()
  @Get()
  @UseInterceptors(LocalizationInterceptor)
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiHeader({
    name: 'locale-code',
    description: 'The language code (e.g., en, ar)',
    required: false,
  })
  getAllPlans(
    @Query() query: { page: number; limit: number },
    @Req() req: Request
  ): Promise<Pagination<PlanEntity>> {
    return this.planService.getAllPlans(+query.page, +query.limit, req['localeCode']);
  }

  @Public()
  @Get(':id')
  @UseInterceptors(LocalizationInterceptor)
  @HttpCode(200)
  @ApiHeader({
    name: 'locale-code',
    description: 'The language code (e.g., en, ar)',
    required: false,
  })
  getOnePlan(@Param('id') id: number, @Req() req: Request): Promise<PlanEntity> {

    return this.planService.getOnePlan(+id, req['localeCode']);
  }
}
