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
        const [cardUploaded, fidUploaded, sidUploaded] = await Promise.all([
            this.storageService.uploadOne(files.card?.[0]),
            this.storageService.uploadOne(files.fid?.[0]),
            this.storageService.uploadOne(files.sid?.[0]),
        ]);
        const hasError = [cardUploaded, fidUploaded, sidUploaded].some((file) => file?.error);

        // if (hasError) {
        //     const successFilesUploaded = [cardUploaded, fidUploaded, sidUploaded]
        //         .filter((file) => file && !file.error);

        //     const pathsToDelete = successFilesUploaded
        //         .map(file => file?.path)
        //         .filter((path): path is string => !!path);

        //     if (pathsToDelete.length > 0) {
        //         await this.storageService.delete('doctor', pathsToDelete, 'cascade');
        //     }

        //     throw new ConflictException('Something went wrong while uploading files!');
        // }

        return {
            card: cardUploaded,
            fid: fidUploaded,
            sid: sidUploaded,
        };
    }
}
