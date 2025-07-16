import {
    ConflictException,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { DoctorFilesDto } from 'src/shared/dtos/doctor.dto';

@Controller('file')
export class FileController {
    constructor(private readonly storageService: StorageUtilService) { }

    @Post('/doctor')
    @Public()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'card', maxCount: 1 },
            { name: 'fid', maxCount: 1 },
            { name: 'sid', maxCount: 1 },
        ]),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload doctor files (card, fid, sid)',
        type: DoctorFilesDto,
    })
    async doctorFiles(
        @UploadedFiles()
        files: {
            card?: Express.Multer.File[];
            fid?: Express.Multer.File[];
            sid?: Express.Multer.File[];
        },
    ) {
        const bucket = 'doctors';

        const uploadOneFile = async (file?: Express.Multer.File) => {
            if (!file) return null;
            try {
                return await this.storageService.uploadFile(file, bucket);
            } catch (error) {
                throw new ConflictException(`File upload failed: ${file.originalname}`);
            }
        };

        const [cardResult, fidResult, sidResult] = await Promise.all([
            uploadOneFile(files.card?.[0]),
            uploadOneFile(files.fid?.[0]),
            uploadOneFile(files.sid?.[0])
        ]);

        return {
            message: 'Files uploaded successfully',
            results: {
                card: cardResult,
                fid: fidResult,
                sid: sidResult,
            },
        };
    }
}
