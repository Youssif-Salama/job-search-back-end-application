import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Pagination } from 'nestjs-typeorm-paginate';
import { addCategoryDto, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) { }

  addCategory(data: addCategoryDto): Promise<CategoryEntity> {
    const { title, description } = data;
    const newCategory = this.categoryRepo.create({ title, description});
    return this.categoryRepo.save(newCategory);
  }

  async updateCategory(data: updateCategoryDto, id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const updated = this.categoryRepo.merge(category, data);
    return this.categoryRepo.save(updated);
  }

  async deleteCategory(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryRepo.remove(category);
  }

  async deleteAllCategories(): Promise<void> {
    return this.categoryRepo.clear();
  }

  async getAllCategories(
    page: number,
    limit: number,
    localeCode: string,
  ): Promise<Pagination<any>> {
    const queryBuilder = this.categoryRepo
      .createQueryBuilder('category')
      .select([
        'category.id',
        `category.title ->> :localeCode AS title`,
        `category.description ->> :localeCode AS description`,
      ])
      .setParameters({ localeCode });

    const [rawData, count] = await Promise.all([
      queryBuilder
        .offset((page - 1) * limit)
        .limit(limit)
        .getRawMany(),

      this.categoryRepo.count(),
    ]);

    const items = rawData.map(category => ({
      id: category.id,
      title: category.title,
      description: category.description,
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

  async getOneCategory(id: number, localeCode: string): Promise<any> {
    const category = await this.categoryRepo
      .createQueryBuilder('category')
      .select([
        'category.id',
        `category.title ->> :localeCode AS title`,
        `category.description ->> :localeCode AS description`,
      ])
      .where('category.id = :id', { id })
      .setParameters({ localeCode })
      .getRawOne();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      id: category.id,
      title: category.title,
      description: category.description,
    };
  }
}
