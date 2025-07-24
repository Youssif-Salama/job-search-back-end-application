import { addCategoryDto, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    addCategory(data: addCategoryDto, req: Request): Promise<CategoryEntity>;
    updateCategory(id: number, data: updateCategoryDto, req: Request): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<CategoryEntity>;
    deleteAllCategories(): Promise<void>;
    getAllCategories(query: {
        page: number;
        limit: number;
    }, req: Request): Promise<Pagination<CategoryEntity>>;
    getOneCategory(id: number, req: Request): Promise<CategoryEntity>;
}
