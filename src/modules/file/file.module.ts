import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { SupaBaseUtilService } from 'src/common/utils/supabase.util';

@Module({
  providers: [FileService, StorageUtilService,SupaBaseUtilService],
  controllers: [FileController]
})
export class FileModule { }
