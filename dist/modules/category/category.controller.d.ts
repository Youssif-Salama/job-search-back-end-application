import { CategoryFormDataDto } from 'src/shared/dtos/category.dto';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from './category.service';
import { StorageUtilService } from 'src/common/utils/storage.util';
export declare class CategoryController {
    private readonly categoryService;
    private readonly storageServic;
    constructor(categoryService: CategoryService, storageServic: StorageUtilService);
    addCategory(data: CategoryFormDataDto, file: Express.Multer.File, req: Request): Promise<CategoryEntity>;
    updateCategory(id: number, data: CategoryFormDataDto, file: Express.Multer.File, req: Request): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<CategoryEntity>;
    deleteAllCategories(): Promise<void>;
    getAllCategories(query: {
        page: number;
        limit: number;
    }, req: Request): Promise<Pagination<CategoryEntity>>;
    getOneCategory(id: number, req: Request): Promise<CategoryEntity>;
}
