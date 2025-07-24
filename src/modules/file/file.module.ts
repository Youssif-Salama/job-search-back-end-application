import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { CloudinaryBaseUtilService } from 'src/common/utils/cloudinary.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [StorageUtilService, CloudinaryBaseUtilService, FileService],
  controllers: [FileController]
})
export class FileModule { }
