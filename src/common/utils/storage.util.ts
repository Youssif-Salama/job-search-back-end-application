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
        let randomWord = "";
        const digitsArr = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
        const loops = 4;

        for (let i = 0; i < loops; i++) {
            const randomIndex = Math.floor(Math.random() * digitsArr.length);
            randomWord += digitsArr[randomIndex];
        }

        return (
            bucket +
            "-" +
            fieldname +
            "-" +
            originalname +
            "-drs-" +
            randomWord +
            "-drs-" +
            new Date().getFullYear() +
            "/" +
            (new Date().getMonth() + 1)
        );
    }

    async uploadFile(fileObj: FileObjType, bucket: string) {
        const { fieldname, originalname, buffer } = fileObj;
        const generatedPublicId = this.generatePublicId(bucket, originalname, fieldname);
        const uploader = this.makeCloudinaryStream(bucket, generatedPublicId, 'image');
        console.log({ uploader })
        const uploadFileResult = await uploader.streamUploader(buffer);

        return {
            url: uploadFileResult.secure_url,
            public_id: uploadFileResult.public_id,
        };
    }

    
}
