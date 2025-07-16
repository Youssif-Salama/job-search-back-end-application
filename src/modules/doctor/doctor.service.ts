import { ConflictException, Injectable } from '@nestjs/common';
import { AddDoctorDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanService } from '../plan/plan.service';
import { CodeUtilService } from 'src/common/utils/code.util';

@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity) private readonly doctorRepo: Repository<DoctorEntity>, private readonly credintialService: CredentialService, private readonly planService: PlanService, private readonly codeService: CodeUtilService) { }

    async doctorSignup(data: AddDoctorDto): Promise<DoctorEntity> {
        const { email, phone } = data;

        const existingDoctor = await this.doctorRepo.findOne({
            where: [{ email }, { phone }]
        });

        if (existingDoctor)
            throw new ConflictException("Email or phone already in use");

        const doctor = this.doctorRepo.create(data);

        const credential = await this.credintialService.createDoctorCredits({
            password: data.password,
            doctor
        });

        if (!credential)
            throw new ConflictException("Failed to create doctor credits");

        const basicPlan = await this.planService.getTheBasicPlan();

        if (!basicPlan)
            throw new ConflictException("Basic plan not found");


        let code = this.codeService.makeAfliateCode({ id: doctor.id, fullName: doctor.fullName });
        doctor.code = {
            code,
            count: 0
        }
        doctor.plan = basicPlan;
        doctor.credential = credential;

        const savedDoctor = await this.doctorRepo.save(doctor);

        if (!savedDoctor)
            throw new ConflictException("Failed to save doctor");

        return savedDoctor;
    }

}
