import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { ContactUsDto, ResendOtpCodeDto, ResendOtpResponseDto } from 'src/shared/dtos/common.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { LocationService } from '../location/location.service';

@Injectable()
export class CommonService {
    constructor(private readonly mailService: MailUtilService, private readonly categoryService: CategoryService, private readonly locationService: LocationService, @InjectRepository(DoctorEntity) private readonly doctorRepo: Repository<DoctorEntity>, @InjectRepository(AdminEntity) private readonly adminRepo: Repository<AdminEntity>, private readonly otpService: OtpUtilService) { }
    async resendOtpCode(data: ResendOtpCodeDto): Promise<ResendOtpResponseDto> {
        if (!data.email || !data.phone) throw new BadRequestException("email or phone required, at least one!!");
        const model = data.model == "admin" ? this.adminRepo : this.doctorRepo;
        const findUser = await model.findOne({
            where: [
                { email: data.email }, { phone: data.phone }
            ]
        })
        if (!findUser) throw new ConflictException("Account not found!!");
        const otp = this.otpService.generateComplexOtp(6);
        findUser.otp = otp
        const name = (data.model == "admin") ? ((findUser as AdminEntity).name) : ((findUser as DoctorEntity).fullName.fname + " " + (findUser as DoctorEntity).fullName.fname)
        const isEmail = data.email ? true : false;
        if (isEmail) {
            this.mailService.sendMail({
                to: data.email,
                subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
                template: "resend_code",
                context: {
                    name,
                    otp
                }
            })
        }
        return {
            name,
            email: findUser.email
        }
        // else {
        //     // phone logic goes here!!
        // }
    }

    async createNewAccountEssentials() {
        const categories = this.categoryService.getAllCategories(1, 50);
        const governorates = this.locationService.getAllGovernorates();

        return {
            categories,
            governorates
        }
    }

    async contactUs(data: ContactUsDto) {
        this.mailService.sendMail({
            to: data.email,
            subject: "ايميل تواصل خاص من احد العملاء",
            template: "contact_us",
            context: {
                name: data.name,
                email: data.email,
                message: data.message
            }
        })
        return null;
    }

    async getDashboardAnalytics() {
        const doctorsCount = await this.doctorRepo.count();
        const activeDoctorsCount = await this.doctorRepo.count({
            where: {
                isActive: true
            }
        });
        const inActiveDoctorsCount = doctorsCount - activeDoctorsCount;

        const adminsCount = await this.adminRepo.count();
        const activeAdminsCount = await this.adminRepo.count({
            where: {
                isActive: true
            }
        });
        const inActiveAdminsCount = adminsCount - activeAdminsCount;

        return {
            doctors: {
                count: doctorsCount,
                activeCount: activeDoctorsCount,
                inActiveCount: inActiveDoctorsCount
            },
            admins: {
                count: adminsCount,
                activeCount: activeAdminsCount,
                inActiveCount: inActiveAdminsCount
            },
        };
    }

}
