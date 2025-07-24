import { Injectable } from "@nestjs/common";
import { CloudinaryBaseUtilService } from "./cloudinary.util";
import * as streamifier from "streamifier";

interface FileObjType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
}

@Injectable()
export class StorageUtilService {
    private cloudinaryStorageClient: any;

    constructor(private readonly cloudinaryService: CloudinaryBaseUtilService) {
        this.cloudinaryStorageClient = this.cloudinaryService.getCloudinaryClient();
    }

    private sanitizeFilename(name: string): string {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-\.]/g, '')
            .substring(0, 50);
    }


    private makeCloudinaryStream(bucket: string, public_id: string, resource_type: string) {
        return {
            streamUploader: (buffer: Buffer): Promise<CloudinaryUploadResult> => {
                return new Promise((resolve, reject) => {
                    const uploadStream = this.cloudinaryStorageClient.uploader.upload_stream(
                        { folder: bucket, resource_type, public_id },
                        (error: any, result: CloudinaryUploadResult) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    streamifier.createReadStream(buffer).pipe(uploadStream);
                });
            },
        };
    }

    private generatePublicId(bucket: string, originalname: string, fieldname: string): string {
        const randomWord = [...Array(4)]
            .map(() => "abcdefghijklmnopqrstuvwxyz1234567890".charAt(Math.floor(Math.random() * 36)))
            .join("");

        const safeName = this.sanitizeFilename(originalname);

        return `${bucket}-${fieldname}-${safeName}-drs-${randomWord}-drs-${new Date().getFullYear()}/${new Date().getMonth() + 1}`;
    }


    async uploadFile(fileObj: FileObjType, bucket: string) {
        const mimetype = fileObj.mimetype.split("/")[0];
        const { fieldname, originalname, buffer } = fileObj;
        const generatedPublicId = this.generatePublicId(bucket, originalname, fieldname);
        const uploader = this.makeCloudinaryStream(bucket, generatedPublicId, mimetype);
        const uploadFileResult = await uploader.streamUploader(buffer);
        console.log({
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        });

        return {
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        };
    }

    async uploadFiles(filesObjs: FileObjType[], bucket: string) {
        const uploads = filesObjs.map(fileObj => this.uploadFile(fileObj, bucket));
        const uploadedFiles = await Promise.all(uploads);
        if (uploadedFiles.length === 0) {
            throw new Error("No files to upload");
        }
        if (uploadedFiles.length < filesObjs.length) {
            // delete the files that were uploaded 
            const successUploadedFilesPublicIdsList = uploadedFiles.filter(upload => upload && upload.public_id);
            if (successUploadedFilesPublicIdsList.length > 0) {
                await this.destroyFiles(successUploadedFilesPublicIdsList.map(file => file.public_id), bucket);
            }
            throw new Error("Some files failed to upload");
        }
        return uploadedFiles;
    }

    async destroyFiles(publicIdList: string[], bucket: string) {
        if (!publicIdList || publicIdList.length === 0) {
            throw new Error("Public ID list is empty. Bad usage of destroyFiles method!");
        }

        const results = await Promise.allSettled(
            publicIdList.map(publicId =>
                this.cloudinaryStorageClient.uploader.destroy(publicId)
            )
        );

        return results.map((result, idx) => ({
            public_id: publicIdList[idx],
            success: result.status === 'fulfilled',
            ...(result.status === 'fulfilled' ? { result: result.value } : { error: result.reason }),
        }));
    }

    async replaceFiles(publicIdList: string[], bucket: string, files: FileObjType[]) {
        (publicIdList && publicIdList?.length > 0) && await this.destroyFiles(publicIdList, bucket);
        return await this.uploadFiles(files, bucket);
    }
}
