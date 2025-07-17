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

        return `${bucket}-${fieldname}-${originalname}-drs-${randomWord}-drs-${new Date().getFullYear()}/${new Date().getMonth() + 1}`;
    }

    async uploadFile(fileObj: FileObjType, bucket: string) {
        const { fieldname, originalname, buffer } = fileObj;
        const generatedPublicId = this.generatePublicId(bucket, originalname, fieldname);
        const uploader = this.makeCloudinaryStream(bucket, generatedPublicId, 'image');
        const uploadFileResult = await uploader.streamUploader(buffer);

        return {
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        };
    }

    async uploadFiles(filesObjs: FileObjType[], bucket: string) {
        const uploads = filesObjs.map(fileObj => this.uploadFile(fileObj, bucket));
        return await Promise.all(uploads);
    }

    async destroyFiles(publicIdList: string[], bucket: string) {
        if (!publicIdList || publicIdList.length === 0) {
            throw new Error("Public ID list is empty. Bad usage of destroyFiles method!");
        }

        const results = await Promise.allSettled(
            publicIdList.map(publicId =>
                this.cloudinaryStorageClient.uploader.destroy(publicId, {
                    resource_type: 'image',
                })
            )
        );

        return results.map((result, idx) => ({
            public_id: publicIdList[idx],
            success: result.status === 'fulfilled',
            ...(result.status === 'fulfilled' ? { result: result.value } : { error: result.reason }),
        }));
    }

    async replaceFiles(publicIdList: string[], bucket: string, files: FileObjType[]) {
        await this.destroyFiles(publicIdList, bucket);
        return await this.uploadFiles(files, bucket);
    }
}
