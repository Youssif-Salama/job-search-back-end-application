import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { CloudinaryBaseUtilService } from 'src/common/utils/cloudinary.util';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    JwtUtilService,
    StorageUtilService,
    CloudinaryBaseUtilService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [CategoryService,TypeOrmModule],
})
export class CategoryModule { }
