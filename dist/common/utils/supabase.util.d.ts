import { ConfigService } from "@nestjs/config";
import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupaBaseUtilService {
    private readonly configService;
    private supbaseClient;
    constructor(configService: ConfigService);
    getSupaBaseClient(): SupabaseClient;
}
