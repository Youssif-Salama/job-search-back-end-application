import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CreateCredentialDto } from 'src/shared/dtos/credential.dto';
import { CredentialEntity } from 'src/shared/entities/credentials.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CredentialService {
    constructor(@InjectRepository(CredentialEntity) private readonly credintialRepo: Repository<CredentialEntity>, private readonly bcryptService: BcryptUtilService) { }
    async createDoctorCredits(data: CreateCredentialDto) {
        const { password, doctor } = data;
        const hashedPassword = await this.bcryptService.bcryptHashingUtil(password);
        const createCredit = this.credintialRepo.create({ password: hashedPassword, doctor });
        const saveCredit = await this.credintialRepo.save(createCredit);
        if (!saveCredit) return false;
        return saveCredit;
    }

    async saveDoctorCredential(data: CredentialEntity) {
        const updateCredits = await this.credintialRepo.save(data);
    }
}