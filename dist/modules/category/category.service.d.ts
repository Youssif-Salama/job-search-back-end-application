import { Pagination } from 'nestjs-typeorm-paginate';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { addCategoryDto, ImgType, updateCategoryDto } from 'src/shared/dtos/category.dto';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepo;
    private readonly storageService;
    constructor(categoryRepo: Repository<CategoryEntity>, storageService: StorageUtilService);
    addCategory(data: addCategoryDto, img: ImgType, lsUpBy: number): Promise<CategoryEntity>;
    updateCategory(data: updateCategoryDto, id: number, file: Express.Multer.File, lsUpBy: number): Promise<CategoryEntity>;
    deleteCategory(id: number): Promise<CategoryEntity>;
    deleteAllCategories(): Promise<void>;
    getAllCategories(page: number, limit: number, localeCode: string): Promise<Pagination<any>>;
    getOneCategory(id: number, localeCode: string): Promise<any>;
}
