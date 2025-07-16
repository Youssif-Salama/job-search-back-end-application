import { StorageUtilService } from 'src/common/utils/storage.util';
export declare class FileController {
    private readonly storageService;
    constructor(storageService: StorageUtilService);
    doctorFiles(files: {
        card?: Express.Multer.File[];
        fid?: Express.Multer.File[];
        sid?: Express.Multer.File[];
    }): Promise<{
        card: {
            error: import("@supabase/storage-js").StorageError;
            bucket: string;
            path: string;
            contentType: string;
            fullPath?: undefined;
            publicUrl?: undefined;
        } | {
            path: string;
            fullPath: string;
            publicUrl: string;
            contentType: string;
            error?: undefined;
            bucket?: undefined;
        } | null;
        fid: {
            error: import("@supabase/storage-js").StorageError;
            bucket: string;
            path: string;
            contentType: string;
            fullPath?: undefined;
            publicUrl?: undefined;
        } | {
            path: string;
            fullPath: string;
            publicUrl: string;
            contentType: string;
            error?: undefined;
            bucket?: undefined;
        } | null;
        sid: {
            error: import("@supabase/storage-js").StorageError;
            bucket: string;
            path: string;
            contentType: string;
            fullPath?: undefined;
            publicUrl?: undefined;
        } | {
            path: string;
            fullPath: string;
            publicUrl: string;
            contentType: string;
            error?: undefined;
            bucket?: undefined;
        } | null;
    }>;
}
