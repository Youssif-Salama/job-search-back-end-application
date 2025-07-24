import { FileService } from "./file.service";
import { Request } from "express";
export type FilesType = {
    card?: Express.Multer.File[];
    fid?: Express.Multer.File[];
    sid?: Express.Multer.File[];
};
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadMyDoctorProfileAuthFiles(req: Request, files: FilesType): Promise<{
        files: {
            card: import("../../shared/entities/doctors.entity").FileClass;
            id: {
                fid: import("../../shared/entities/doctors.entity").FileClass;
                sid: import("../../shared/entities/doctors.entity").FileClass;
            };
        };
    }>;
    uploadMyDoctorProfileImg(req: any, file: Express.Multer.File): Promise<{
        img: import("../../shared/entities/doctors.entity").FileClass;
    }>;
    uploadMyDoctorProfileClinicFiles(req: Request, files: Express.Multer.File[]): Promise<{
        files: import("../../shared/entities/doctors.entity").FileClass[];
    }>;
    updateMyDoctorProfileAuthFiles(files: FilesType, req: Request): Promise<{
        files: {
            card: import("../../shared/entities/doctors.entity").FileClass | undefined;
            id: {
                fid: import("../../shared/entities/doctors.entity").FileClass | undefined;
                sid: import("../../shared/entities/doctors.entity").FileClass | undefined;
            };
        };
    }>;
}
