import { CloudinaryBaseUtilService } from "./cloudinary.util";
interface FileObjType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
export declare class StorageUtilService {
    private readonly cloudinaryService;
    private cloudinaryStorageClient;
    constructor(cloudinaryService: CloudinaryBaseUtilService);
    private makeCloudinaryStream;
    private generatePublicId;
    uploadFile(fileObj: FileObjType, bucket: string): Promise<{
        url: string;
        public_id: string;
    }>;
}
export {};
