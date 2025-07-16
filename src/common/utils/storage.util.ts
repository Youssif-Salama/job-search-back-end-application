import { ConflictException, Injectable } from "@nestjs/common";
import { SupaBaseUtilService } from "./supabase.util";

@Injectable()
export class StorageUtilService {
    constructor(private readonly supabaseService: SupaBaseUtilService) { }

    async upload(bucket: string, file: Buffer, path: string, contentType: string) {
        const supabase = this.supabaseService.getSupaBaseClient();

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                contentType,
                upsert: true,
            });

        if (error) return { error, bucket, path, contentType };
        const { data: publicUrlContainer } = supabase.storage.from(bucket).getPublicUrl(data?.path)
        return {
            path: data?.path,
            fullPath: data?.fullPath,
            publicUrl: publicUrlContainer.publicUrl,
            contentType
        }
    }

    async getPublicUrl(bucket: string, path: string) {
        const supabase = this.supabaseService.getSupaBaseClient();
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data;
    }

    async uploadOne(file?: Express.Multer.File) {
        if (!file) return null;
        const uniqueName = `${file.fieldname}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`;
        return await this.upload(
            'doctor',
            file.buffer,
            uniqueName,
            file.mimetype,
        );
    };

    async delete(bucket: string, paths: string[], type: 'normal' | 'cascade') {
        const supabase = this.supabaseService.getSupaBaseClient();
        if (!bucket || paths?.length == 0) return false;
        const { data, error } = await supabase.storage.from(bucket).remove([...paths]);
        if (error) throw new ConflictException(error.message)
        else {
            if (type === 'cascade') {
                return true
            }
            return data;
        }
    }
}
