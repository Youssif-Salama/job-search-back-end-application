import { AddDoctorDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    doctorSignup(data: AddDoctorDto): Promise<DoctorEntity>;
}
