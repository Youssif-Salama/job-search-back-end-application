import { SupaBaseUtilService } from "./supabase.util";
export declare class StorageUtilService {
    private readonly supabaseService;
    constructor(supabaseService: SupaBaseUtilService);
    upload(bucket: string, file: Buffer, path: string, contentType: string): Promise<{
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
    }>;
    getPublicUrl(bucket: string, path: string): Promise<{
        publicUrl: string;
    }>;
    uploadOne(file?: Express.Multer.File): Promise<{
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
    } | null>;
    delete(bucket: string, paths: string[], type: 'normal' | 'cascade'): Promise<boolean | import("@supabase/storage-js").FileObject[]>;
}
