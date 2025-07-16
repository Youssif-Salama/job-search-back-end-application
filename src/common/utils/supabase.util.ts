import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupaBaseUtilService {
    private supbaseClient: SupabaseClient;
    constructor(private readonly configService: ConfigService) {
        const url = this.configService.get<string>('envConfig.supabase.url');
        const key = this.configService.get<string>('envConfig.supabase.key');
        if (url && key)
            this.supbaseClient = createClient(url, key)
    }

    getSupaBaseClient(): SupabaseClient {
        return this.supbaseClient;
    }
}