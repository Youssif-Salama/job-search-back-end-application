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
  UploadedFile,
} from '@nestjs/common';
import { addCategoryDto, CategoryFormDataDto, ImgDto, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/common/decorators/public.decorator';
import LocalizationInterceptor from 'src/common/interceptors/localization.interceptor';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageUtilService } from 'src/common/utils/storage.util';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService, private readonly storageServic: StorageUtilService) { }

  @Post()
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Add a new category',
    type: addCategoryDto,
  })
  @UseInterceptors(FileInterceptor('img'))
  async addCategory(
    @Body() data: CategoryFormDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<CategoryEntity> {
    const bucket = 'categories';
    const img = await this.storageServic.uploadFile(file, bucket);
    if (!img) {
      throw new Error('Image upload failed');
    }
    data.title = JSON.parse(data?.title);
    data.description = JSON.parse(data?.description);
    return this.categoryService.addCategory(data as any, img, req['user']?.id);
  }


  @Put(':id')
  @ApiBearerAuth('access-token')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update an existing category',
    type: updateCategoryDto,
  })
  @UseInterceptors(FileInterceptor("img"))
  async updateCategory(
    @Param('id') id: number,
    @Body() data: CategoryFormDataDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ): Promise<CategoryEntity> {
    data.title = JSON.parse(data?.title);
    data.description = JSON.parse(data?.description);
    return this.categoryService.updateCategory(data as any, +id, file, req['user']?.id);
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
