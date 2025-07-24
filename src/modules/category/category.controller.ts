import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  HttpCode,
  Delete,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { addCategoryDto, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/common/decorators/public.decorator';
import LocalizationInterceptor from 'src/common/interceptors/localization.interceptor';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiBearerAuth('access-token')
  async addCategory(
    @Body() data: addCategoryDto,
    @Req() req: Request,
  ): Promise<CategoryEntity> {
    return this.categoryService.addCategory(data, req['user']?.id);
  }

  @Put(':id')
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async updateCategory(
    @Param('id') id: number,
    @Body() data: updateCategoryDto,
    @Req() req: Request
  ): Promise<CategoryEntity> {
    return this.categoryService.updateCategory(data, +id, req['user']?.id);
  }

  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async deleteCategory(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.deleteCategory(+id);
  }

  @Delete()
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  async deleteAllCategories(): Promise<void> {
    return this.categoryService.deleteAllCategories();
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
  async getAllCategories(
    @Query() query: { page: number; limit: number },
    @Req() req: Request
  ): Promise<Pagination<CategoryEntity>> {
    return this.categoryService.getAllCategories(+query.page, +query.limit, req['localeCode']);
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
  async getOneCategory(@Param('id') id: number, @Req() req: Request): Promise<CategoryEntity> {
    return this.categoryService.getOneCategory(+id, req['localeCode']);
  }
}
