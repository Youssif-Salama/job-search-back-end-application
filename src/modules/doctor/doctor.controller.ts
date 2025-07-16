import { Body, Controller, Post } from '@nestjs/common';
import { AddDoctorDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { DoctorService } from './doctor.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) { }

    @Public()
    @Post('/signup')
    doctorSignup(@Body() data: AddDoctorDto): Promise<DoctorEntity> {
        return this.doctorService.doctorSignup(data);
    }
}
