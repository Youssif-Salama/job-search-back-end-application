import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckAdminExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
  ) { }
  async transform(value: CreateAdminDto): Promise<CreateAdminDto> {
    const adminExistCheck = await this.adminRepo.findOne({
      where: [
        { name: value.name },
        { email: value.email }
      ],
    });
    if (adminExistCheck) {
      throw new ConflictException(
        [`Wrong Credentials`],
      );
    } else {
      return value;
    }
  }
}


