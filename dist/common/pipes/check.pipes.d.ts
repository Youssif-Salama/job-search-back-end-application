import { PipeTransform } from '@nestjs/common';
import { CreateAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';
export declare class CheckAdminExistPipe implements PipeTransform {
    private adminRepo;
    constructor(adminRepo: Repository<AdminEntity>);
    transform(value: CreateAdminDto): Promise<CreateAdminDto>;
}
