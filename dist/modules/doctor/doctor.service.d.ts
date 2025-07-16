import { AddDoctorDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
import { PlanService } from '../plan/plan.service';
import { CodeUtilService } from 'src/common/utils/code.util';
export declare class DoctorService {
    private readonly doctorRepo;
    private readonly credintialService;
    private readonly planService;
    private readonly codeService;
    constructor(doctorRepo: Repository<DoctorEntity>, credintialService: CredentialService, planService: PlanService, codeService: CodeUtilService);
    doctorSignup(data: AddDoctorDto): Promise<DoctorEntity>;
}
