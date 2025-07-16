"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageUtilService = void 0;
const common_1 = require("@nestjs/common");
const supabase_util_1 = require("./supabase.util");
let StorageUtilService = class StorageUtilService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async upload(bucket, file, path, contentType) {
        const supabase = this.supabaseService.getSupaBaseClient();
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
            contentType,
            upsert: true,
        });
        if (error)
            return { error, bucket, path, contentType };
        const { data: publicUrlContainer } = supabase.storage.from(bucket).getPublicUrl(data?.path);
        return {
            path: data?.path,
            fullPath: data?.fullPath,
            publicUrl: publicUrlContainer.publicUrl,
            contentType
        };
    }
    async getPublicUrl(bucket, path) {
        const supabase = this.supabaseService.getSupaBaseClient();
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data;
    }
    async uploadOne(file) {
        if (!file)
            return null;
        const uniqueName = `${file.fieldname}-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`;
        return await this.upload('doctor', file.buffer, uniqueName, file.mimetype);
    }
    ;
    async delete(bucket, paths, type) {
        const supabase = this.supabaseService.getSupaBaseClient();
        if (!bucket || paths?.length == 0)
            return false;
        const { data, error } = await supabase.storage.from(bucket).remove([...paths]);
        if (error)
            throw new common_1.ConflictException(error.message);
        else {
            if (type === 'cascade') {
                return true;
            }
            return data;
        }
    }
};
exports.StorageUtilService = StorageUtilService;
exports.StorageUtilService = StorageUtilService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_util_1.SupaBaseUtilService])
], StorageUtilService);
//# sourceMappingURL=storage.util.js.map