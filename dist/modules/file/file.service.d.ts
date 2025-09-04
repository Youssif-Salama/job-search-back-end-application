import { StorageUtilService } from 'src/common/utils/storage.util';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { FilesType } from './file.controller';
export declare class FileService {
    private readonly storageService;
    private readonly doctorRepo;
    constructor(storageService: StorageUtilService, doctorRepo: Repository<DoctorEntity>);
    updateDoctorClincFiles(doctorId: number, files: Express.Multer.File[], keepFiles: {
        public_id: string;
        url: string;
    }[]): Promise<{
        files: import("src/shared/entities/doctors.entity").FileClass[];
    }>;
    updateDoctorAuthFiles(doctorId: number, files: FilesType): Promise<{
        files: {
            card: import("src/shared/entities/doctors.entity").FileClass | undefined;
            id: {
                fid: import("src/shared/entities/doctors.entity").FileClass | undefined;
            };
        };
    }>;
    createDoctorAuthFiles(doctorId: number, files: FilesType): Promise<{
        files: {
            card: import("src/shared/entities/doctors.entity").FileClass;
            id: {
                fid: import("src/shared/entities/doctors.entity").FileClass;
            };
        };
    }>;
    updateDoctorProfileImg(doctorId: number, file: Express.Multer.File): Promise<{
        img: import("src/shared/entities/doctors.entity").FileClass;
    }>;
}
