import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CreateCredentialDto } from 'src/shared/dtos/credential.dto';
import { CredentialEntity } from 'src/shared/entities/credentials.entity';
import { Repository } from 'typeorm';
export declare class CredentialService {
    private readonly credintialRepo;
    private readonly bcryptService;
    constructor(credintialRepo: Repository<CredentialEntity>, bcryptService: BcryptUtilService);
    createDoctorCredits(data: CreateCredentialDto): Promise<false | CredentialEntity>;
    saveDoctorCredential(data: CredentialEntity): Promise<void>;
}
