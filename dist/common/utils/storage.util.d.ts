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
    private sanitizeFilename;
    private makeCloudinaryStream;
    private generatePublicId;
    uploadFile(fileObj: FileObjType, bucket: string): Promise<{
        url: string;
        public_id: string;
    }>;
    uploadFiles(filesObjs: FileObjType[], bucket: string): Promise<{
        url: string;
        public_id: string;
    }[]>;
    destroyFiles(publicIdList: string[], bucket: string): Promise<({
        result: any;
        public_id: string;
        success: boolean;
    } | {
        error: any;
        public_id: string;
        success: boolean;
    })[]>;
    replaceFiles(publicIdList: string[], bucket: string, files: FileObjType[]): Promise<{
        url: string;
        public_id: string;
    }[]>;
}
export {};
