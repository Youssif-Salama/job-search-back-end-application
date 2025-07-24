import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageUtilService } from 'src/common/utils/storage.util';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { FilesType } from './file.controller';

@Injectable()
export class FileService {
    constructor(
        private readonly storageService: StorageUtilService,
        @InjectRepository(DoctorEntity)
        private readonly doctorRepo: Repository<DoctorEntity>
    ) { }

    /**
     * Update doctor's clinic files (imgs).
     * Handles keeping old files, deleting removed ones, and uploading new files.
     */
    async updateDoctorClincFiles(
        doctorId: number,
        files: Express.Multer.File[],
        keepFiles: { public_id: string; url: string }[]
    ) {
        // Find doctor
        const doctor = await this.doctorRepo.findOneBy({ id: +doctorId });
        if (!doctor) throw new NotFoundException("Doctor profile not found");

        // Ensure clinc and imgs are initialized
        doctor.clinc = doctor.clinc || {};
        doctor.clinc.imgs = doctor.clinc.imgs || [];

        // Must keep at least one file or upload new ones
        if ((!keepFiles || keepFiles.length === 0) && (!files || files.length === 0)) {
            throw new BadRequestException("You must upload at least one file or provide old files to keep");
        }

        // If no keepFiles, replace all existing files with new ones
        if ((!keepFiles || keepFiles.length === 0) && files && files.length > 0) {
            const oldPublicIds = doctor.clinc.imgs.map(img => img.public_id);
            const replacedFiles = await this.storageService.replaceFiles(oldPublicIds, "doctors/clinc", files);
            if (!replacedFiles || replacedFiles.length === 0) throw new BadRequestException("Files upload failed, please try again");
            doctor.clinc.imgs = replacedFiles;
        } else {
            // Delete files not in keepFiles
            const filesToDelete = doctor.clinc.imgs.filter(
                img => !keepFiles.some(file => file.public_id === img.public_id)
            );
            const publicIdsToDelete = filesToDelete.map(file => file.public_id);
            console.log({publicIdsToDelete})
            if (publicIdsToDelete.length > 0) {
                const deletedFiles = await this.storageService.destroyFiles(publicIdsToDelete, "doctors/clinc");
                if (!deletedFiles) throw new BadRequestException("Failed to delete old files, please try again");
            }

            // Check total images before uploading new files (max 10)
            if (keepFiles.length + (files?.length || 0) > 10) {
                throw new BadRequestException("You cannot have more than 10 clinic images");
            }

            // Upload new files if any
            let uploadedFiles: { public_id: string; url: string }[] = [];
            if (files && files.length > 0) {
                uploadedFiles = await this.storageService.uploadFiles(files, "doctors/clinc");
                if (!uploadedFiles || uploadedFiles.length === 0) {
                    throw new BadRequestException("Files upload failed, please try again");
                }
            }

            // Merge keepFiles and uploadedFiles, avoiding duplicates
            const mergedImgs = [
                ...keepFiles,
                ...uploadedFiles.filter(
                    up => !keepFiles.some(kf => kf.public_id === up.public_id)
                )
            ];
            doctor.clinc.imgs = mergedImgs;
        }

        // Save doctor entity with updated imgs
        const savedDoctor = await this.doctorRepo.save(doctor);
        if (!savedDoctor) throw new BadRequestException("Failed to save your profile clinc files");
        return { files: doctor.clinc.imgs };
    }

    /**
     * Update doctor's auth files (card, fid, sid).
     * Only updates the files sent in the request.
     */
    async updateDoctorAuthFiles(
        doctorId: number,
        files: FilesType
    ) {
        const doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } });
        if (!doctor) {
            throw new NotFoundException('Doctor profile not found');
        }
        const doctorAuthFiles = doctor.auth || {};
        const filesToUpdate: { [key: string]: Express.Multer.File } = {};
        const publicIdsList: string[] = [];
        // Prepare files to update and collect old public_ids for replacement
        if (files.card?.length) {
            filesToUpdate['card'] = files.card[0];
            if (doctorAuthFiles.card?.public_id) publicIdsList.push(doctorAuthFiles.card.public_id);
        }
        if (files.fid?.length) {
            filesToUpdate['fid'] = files.fid[0];
            if (doctorAuthFiles.id?.fid?.public_id) publicIdsList.push(doctorAuthFiles.id.fid.public_id);
        }
        if (files.sid?.length) {
            filesToUpdate['sid'] = files.sid[0];
            if (doctorAuthFiles.id?.sid?.public_id) publicIdsList.push(doctorAuthFiles.id.sid.public_id);
        }
        if (Object.keys(filesToUpdate).length === 0) {
            throw new BadRequestException('You must upload at least one file');
        }
        // Replace only the sent files
        const replacedFiles = await this.storageService.replaceFiles(publicIdsList, "doctors/auth", Object.values(filesToUpdate));
        if (!replacedFiles || replacedFiles.length === 0) {
            throw new BadRequestException(['File upload failed, please try again']);
        }
        // Build new auth object, keeping old files if not updated
        const newAuth = {
            card: filesToUpdate['card']
                ? replacedFiles.find(f => f.public_id && f.public_id.includes('card'))
                : doctorAuthFiles.card,
            id: {
                fid: filesToUpdate['fid']
                    ? replacedFiles.find(f => f.public_id && f.public_id.includes('fid'))
                    : doctorAuthFiles.id?.fid,
                sid: filesToUpdate['sid']
                    ? replacedFiles.find(f => f.public_id && f.public_id.includes('sid'))
                    : doctorAuthFiles.id?.sid,
            }
        };
        const updateMyDoctorFiles = await this.doctorRepo.update(doctor.id, {
            auth: newAuth,
            isActive: false
        });
        if (!updateMyDoctorFiles || updateMyDoctorFiles.affected === 0) {
            throw new BadRequestException(['Failed to update your profile files, please try again later']);
        }
        return { files: newAuth };
    }

    /**
     * Create doctor's auth files for the first time (all required).
     */
    async createDoctorAuthFiles(
        doctorId: number,
        files: FilesType
    ) {
        const doctor = await this.doctorRepo.findOne({ where: { id: +doctorId } });
        if (!doctor) {
            throw new NotFoundException('Doctor profile not found');
        }
        // All three files are required for first time
        if (!files.card?.length || !files.fid?.length || !files.sid?.length) {
            throw new BadRequestException(['You must upload all three files: card and identification front and back']);
        }
        const filesObjs = [
        files.card[0],
            files.fid[0],
            files.sid[0]
        ];
        // Upload all files
        const uploadedFiles = await this.storageService.uploadFiles(filesObjs, "doctors/auth");
        if (!uploadedFiles || uploadedFiles.length === 0) {
            throw new BadRequestException(['File upload failed, please try again']);
        }
        // Build auth object from uploaded files
        const doctorFiles = {
            card: uploadedFiles.find(file => file.public_id && file.public_id.includes('card')) || doctor.auth?.card,
            id: {
                fid: uploadedFiles.find(file => file.public_id && file.public_id.includes('fid')) || doctor.auth?.id?.fid,
                sid: uploadedFiles.find(file => file.public_id && file.public_id.includes('sid')) || doctor.auth?.id?.sid
            }
        };
        // Ensure all files exist
        if (!doctorFiles.card || !doctorFiles.id.fid || !doctorFiles.id.sid) {
            throw new BadRequestException('All auth files must be provided');
        }

        doctor.auth = doctorFiles;
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new BadRequestException(['Failed to update your profile files, please try again later']);
        }
        return { files: doctorFiles };
    }

    /**
     * Update doctor's profile image.
     * Replaces the old image with the new one.
     */
    async updateDoctorProfileImg(
        doctorId: number,
        file: Express.Multer.File
    ) {
        if (!doctorId) throw new BadRequestException('User not authenticated');
        const doctor = await this.doctorRepo.findOneBy({ id: doctorId });
        if (!doctor) throw new NotFoundException('Doctor profile not found');
        if (!file) throw new BadRequestException('You must upload your profile img');
        const { img } = doctor;
        // Replace old image with new one
        const replacedFiles = await this.storageService.replaceFiles([img?.public_id], "doctors/img", [file]);
        if (!replacedFiles || !replacedFiles[0].public_id) throw new BadRequestException('File upload failed, please try again');
        doctor.img = {
            public_id: replacedFiles[0].public_id,
            url: replacedFiles[0].url
        };
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) throw new BadRequestException('Failed to update your profile image, please try again later');
        return { img: doctor.img };
    }
}