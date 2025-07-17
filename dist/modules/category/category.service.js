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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const storage_util_1 = require("../../common/utils/storage.util");
const categoris_entity_1 = require("../../shared/entities/categoris.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    categoryRepo;
    storageService;
    constructor(categoryRepo, storageService) {
        this.categoryRepo = categoryRepo;
        this.storageService = storageService;
    }
    async addCategory(data, img, lsUpBy) {
        const { title, description } = data;
        console.log({
            title,
            description,
            img,
            lsUpBy
        });
        const newCategory = this.categoryRepo.create({ title, description, img, lsUpBy });
        const result = await this.categoryRepo.save(newCategory);
        if (!result) {
            await this.storageService.destroyFiles([img.public_id], 'categories');
            throw new common_1.NotFoundException('Failed to create category');
        }
        return result;
    }
    async updateCategory(data, id, file, lsUpBy) {
        const category = await this.categoryRepo.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const { img } = category;
        let newImg = img;
        if (file) {
            const publicIdList = img?.public_id ? [img.public_id] : [];
            const newImgs = await this.storageService.replaceFiles(publicIdList, 'categories', [file]);
            newImg = newImgs[0] || img;
        }
        const { title, description } = data;
        const updated = this.categoryRepo.merge(category, {
            title,
            description,
            img: newImg,
            lsUpBy
        });
        return this.categoryRepo.save(updated);
    }
    async deleteCategory(id) {
        const category = await this.categoryRepo.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return this.categoryRepo.remove(category);
    }
    async deleteAllCategories() {
        return this.categoryRepo.clear();
    }
    async getAllCategories(page, limit, localeCode) {
        if (!localeCode) {
            const queryBuilder = this.categoryRepo.createQueryBuilder('category')
                .orderBy('category.id', 'ASC')
                .select(['category.id', 'category.title', 'category.description']);
            return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit, route: 'category' });
        }
        else {
            const queryBuilder = this.categoryRepo
                .createQueryBuilder('category')
                .select([
                'category.id AS id',
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
    }
    async getOneCategory(id, localeCode) {
        if (!localeCode) {
            const category = await this.categoryRepo.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            return {
                id: category.id,
                title: category.title,
                description: category.description
            };
        }
        else {
            const category = await this.categoryRepo
                .createQueryBuilder('category')
                .select([
                'category.id AS id',
                `category.title ->> :localeCode AS title`,
                `category.description ->> :localeCode AS description`,
            ])
                .where('category.id = :id', { id })
                .setParameters({ localeCode })
                .getRawOne();
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            return {
                id: category.id,
                title: category.title,
                description: category.description,
            };
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categoris_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        storage_util_1.StorageUtilService])
], CategoryService);
//# sourceMappingURL=category.service.js.map