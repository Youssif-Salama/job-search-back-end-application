import { Pagination } from 'nestjs-typeorm-paginate';
import { addCategoryDto, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: Repository<CategoryEntity>);
    addCategory(data: addCategoryDto, lsUpBy: number): Promise<CategoryEntity>;
    updateCategory(data: updateCategoryDto, id: number, lsUpBy: number): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<CategoryEntity>;
    deleteAllCategories(): Promise<void>;
    getAllCategories(page: number, limit: number, localeCode?: string): Promise<Pagination<any>>;
    getOneCategory(id: number, localeCode: string): Promise<any>;
    findOneCategoryForDoctor(id: number): Promise<null | CategoryEntity>;
}
