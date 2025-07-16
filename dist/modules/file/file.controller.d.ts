import { StorageUtilService } from 'src/common/utils/storage.util';
export declare class FileController {
    private readonly storageService;
    constructor(storageService: StorageUtilService);
    doctorFiles(files: {
        card?: Express.Multer.File[];
        fid?: Express.Multer.File[];
        sid?: Express.Multer.File[];
    }): Promise<{
        message: string;
        results: {
            card: {
                url: string;
                public_id: string;
            } | null;
            fid: {
                url: string;
                public_id: string;
            } | null;
            sid: {
                url: string;
                public_id: string;
            } | null;
        };
    }>;
}
