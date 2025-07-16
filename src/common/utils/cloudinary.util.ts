import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryBaseUtilService {
    constructor(private readonly configService: ConfigService) {
        const cloud_name = this.configService.get<string>("envConfig.cloudinary.name");
        const api_key = this.configService.get<string>("envConfig.cloudinary.key");
        const api_secret = this.configService.get<string>("envConfig.cloudinary.secret");

        if (!cloud_name || !api_key || !api_secret) {
            throw new Error("credintials missing in cloud service")
        }
        cloudinary.config({
            cloud_name,
            api_key,
            api_secret,
        });
    }

    getCloudinaryClient() {
        return cloudinary;
    }
}
