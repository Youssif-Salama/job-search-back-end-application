import {
    BadRequestException,
    Controller,
    Post,
    UseInterceptors,
    UploadedFiles,
    UploadedFile,
    Req,
    HttpCode,
    Patch
} from "@nestjs/common";
import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor
} from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { DoctorProfileAuthFiles, DoctorProfileAuthUpdateFiles, DoctorProfileImgDto } from "src/shared/dtos/file.dto";
import { FileService } from "./file.service";
import { Request } from "express";

export type FilesType = {
    card?: Express.Multer.File[],
    fid?: Express.Multer.File[],
};

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService
    ) { }

    @Post('doctor/auth')
    @ApiBearerAuth('access-token')
    @UseInterceptors(FileFieldsInterceptor([
        { name: "card", maxCount: 1 },
        { name: "fid", maxCount: 1 },
    ]))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "doctor profile auth files, بعد م الدكتور يسجل بياناته لاول مره",
        type: DoctorProfileAuthFiles
    })
    async uploadMyDoctorProfileAuthFiles(
        @Req() req: Request,
        @UploadedFiles() files: FilesType
    ) {
        const { id } = req['user'];
        return this.fileService.createDoctorAuthFiles(+id, files);
    }

    @Patch("doctor/img")
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('img'))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "doctor profile image, اضافه او تعديل الصوره الشخصيه للدكتور",
        type: DoctorProfileImgDto
    })
    @ApiBearerAuth('access-token')
    async uploadMyDoctorProfileImg(
        @Req() req,
        @UploadedFile() file: Express.Multer.File
    ) {
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorProfileImg(+doctorId, file);
    }

    @Patch("doctor/clinic")
    @HttpCode(200)
    @UseInterceptors(FilesInterceptor('files', 10))
    @ApiConsumes("multipart/form-data")
    @ApiBearerAuth('access-token')
    @ApiBody({
        description: "doctor profile clinic files, اضافه ملفات العياده او التعديل عليها",
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary"
                    },
                    description: "Up to 10 files"
                },
                keepFiles: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            public_id: {
                                type: "string",
                                description: "Public ID of the old file to keep"
                            },
                            url: {
                                type: "string",
                                description: "URL of the old file to keep"
                            }
                        }
                    },
                    nullable: true,
                    description: "List of old files to keep (can be empty or omitted)"
                }
            }
        }
    })
    async uploadMyDoctorProfileClinicFiles(
        @Req() req: Request,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        let keepFiles: { public_id: string, url: string }[] = [];
        if (req.body.keepFiles) {
            try {
                keepFiles = typeof req.body.keepFiles === 'string'
                    ? JSON.parse(req.body.keepFiles)
                    : req.body.keepFiles;
            } catch {
                throw new BadRequestException("keepFiles must be a valid JSON array");
            }
        }
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorClincFiles(+doctorId, files, keepFiles);
    }


    @Patch('doctor/auth')
    @HttpCode(200)
    @UseInterceptors(FileFieldsInterceptor([
        { name: "card", maxCount: 1 },
        { name: "fid", maxCount: 1 },
    ]))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: "doctor profile auth تعديل الملفات ",
        type: DoctorProfileAuthUpdateFiles
    })
    async updateMyDoctorProfileAuthFiles(
        @UploadedFiles() files: FilesType,
        @Req() req: Request
    ) {
        const doctorId = req['user']?.id;
        return this.fileService.updateDoctorAuthFiles(+doctorId, files);
    }
}