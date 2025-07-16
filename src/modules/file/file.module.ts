import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { CloudinaryBaseUtilService } from 'src/common/utils/cloudinary.util';

@Module({
  providers: [FileService, StorageUtilService,CloudinaryBaseUtilService],
  controllers: [FileController]
})
export class FileModule { }
