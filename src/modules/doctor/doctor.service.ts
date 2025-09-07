import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AddDoctorDto, ClincAndWorkingDaysDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, DoctorProfileViewerDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, GetDoctorQueriesDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorEntity, FileClass } from 'src/shared/entities/doctors.entity';
import { Not, Repository } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanService } from '../plan/plan.service';
import { CodeUtilService } from 'src/common/utils/code.util';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import DoctorVerifyUpdateEmail from 'src/common/pages/doctor.verifyUpdateEmail';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CategoryService } from '../category/category.service';
import { WorkingHoursEntity } from 'src/shared/entities/workinHours.entity';
import { paginate } from 'nestjs-typeorm-paginate';


@Injectable()
export class DoctorService {
    constructor(@InjectRepository(DoctorEntity) private readonly doctorRepo: Repository<DoctorEntity>,
        @InjectRepository(WorkingHoursEntity) private readonly workingHoursRepo: Repository<WorkingHoursEntity>,
        private readonly credintialService: CredentialService, private readonly planService: PlanService, private readonly codeService: CodeUtilService, private readonly emailService: MailUtilService, private readonly otpService: OtpUtilService, private readonly jwtService: JwtUtilService, private readonly config: ConfigService, private readonly bcryptService: BcryptUtilService, private readonly categoryService: CategoryService) { }

    async doctorSignup(data: AddDoctorDto): Promise<DoctorResponseType & { token: string }> {
        const { email, phone } = data;

        // Check if a doctor with the same email or phone already exists
        const existingDoctor = await this.doctorRepo.findOne({
            where: [{ email }, { phone }]
        });

        if (existingDoctor)
            throw new ConflictException("Email or phone already in use");

        // Create a new doctor entity from the provided data
        const doctor = this.doctorRepo.create(data);

        // Create credentials for the new doctor
        const credential = await this.credintialService.createDoctorCredits({
            password: await this.bcryptService.bcryptHashingUtil(data.password),
            doctor
        });

        if (!credential)
            throw new ConflictException("Failed to create doctor credits");

        // Get the basic plan to assign to the doctor
        const basicPlan = await this.planService.getTheBasicPlan();

        if (!basicPlan)
            throw new ConflictException("Basic plan not found");

        // Generate an affiliate code for the doctor
        let code = this.codeService.makeAfliateCode({ id: doctor.id, fullName: doctor.fullName });
        console.log({ code });
        doctor.code = {
            code,
            count: 0
        }

        // Assign the plan and credentials to the doctor
        doctor.plan = basicPlan;
        doctor.credential = credential;

        // Generate a 6-digit OTP for the doctor
        let otp = this.otpService.generateComplexOtp(6);
        doctor.otp = otp;

        // Save the new doctor entity to the database
        const savedDoctor = await this.doctorRepo.save(doctor);

        if (!savedDoctor)
            throw new ConflictException("Failed to save doctor");

        // Send a signup confirmation email with the OTP
        this.emailService.sendMail({
            to: savedDoctor.email,
            subject: "DRS - Doctor Signup Confirmation",
            template: "doctor_signup",
            context: {
                name: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname,
                otp: savedDoctor.otp,
            }
        })
        // generate token to use it in auth files upload
        const token = this.jwtService.generateToken({
            fullName: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname, id: savedDoctor.id, isActive: savedDoctor.isActive,
            isVerified: savedDoctor.isVerified, email: savedDoctor.email
        });
        // Return the saved doctor
        return {
            fullName: savedDoctor.fullName.fname + " " + savedDoctor.fullName.lname,
            isActive: savedDoctor.isActive,
            isVerified: savedDoctor.isVerified,
            token
        };
    }

    async doctorProfileVerifyAccountEmail(data: doctorProfleVerifeAccountEmailDto) {
        const { email, otp } = data;
        const doctor = await this.doctorRepo.findOne({ where: { email } });
        if (!doctor) throw new NotFoundException("Doctor account not found!!");
        if (!doctor.otp || doctor.otp != otp) throw new ConflictException("Something went wrong with otp!!");
        doctor.isVerified = true;
        doctor.otp = "";
        try {
            await this.doctorRepo.save(doctor);
            return {
                fullName: doctor.fullName.fname + " " + doctor.fullName.lname,
                isActive: doctor.isActive,
                isVerified: doctor.isVerified,
            }
        }
        catch (error) {
            throw new ConflictException("Somthing went wrong on valid your account");
        }
    }

    async doctorLogin(data: LoginDoctorDto): Promise<{ token: string; doctor: { name: { fname: string; lname: string }; email: string; img: string | FileClass } }> {
        const doctor = await this.doctorRepo.findOne({
            where: { email: data.email }
        });
        if (!doctor) throw new NotFoundException("Account not found!");
        if (!doctor.isActive) throw new ConflictException("Account is not active!");
        if (!doctor.isVerified) throw new ConflictException("Account is not verified!");
        const token = await this.jwtService.generateToken({
            email: data.email,
            id: doctor.id
        });
        const doctorData = {
            name: doctor.fullName,
            email: doctor.email,
            img: doctor.img
        }
        return { token, doctor: doctorData };
    }

    async updateMyDoctorProfileRawData(data: DoctorUpdateRawDataDto, doctorId: number): Promise<DoctorResponseType> {
        const { email, phone, fullName, address, clinc } = data;

        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (!doctor) {
            throw new NotFoundException("Doctor not found!");
        }

        const existingImgs = doctor.clinc?.imgs || [];
        let isEmailChanged = false;

        const updates: Partial<typeof doctor> = {};

        if (email && email !== doctor.email) {
            isEmailChanged = true;
            updates.email = email;
            updates.isVerified = false;
            updates.otp = this.otpService.generateComplexOtp(6);
        }

        if (phone && phone !== doctor.phone) {
            updates.phone = phone;
        }

        if (fullName && JSON.stringify(fullName) !== JSON.stringify(doctor.fullName)) {
            updates.fullName = fullName;
        }

        if (address && JSON.stringify(address) !== JSON.stringify(doctor.address)) {
            updates.address = address;
        }

        if (clinc && JSON.stringify(clinc) !== JSON.stringify(doctor.clinc)) {
            updates.clinc = {
                ...clinc,
                imgs: existingImgs
            };
        }

        if (Object.keys(updates).length === 0) {
            return {
                fullName: `${doctor.fullName.fname} ${doctor.fullName.lname}`,
                isActive: doctor.isActive,
                isVerified: doctor.isVerified,
            };
        }

        Object.assign(doctor, updates);

        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new ConflictException("Failed to update account data");
        }

        // send email to verify the updated email
        this.emailService.sendMail({
            to: updatedDoctor.email,
            subject: "DRS - Email Update Verification",
            template: "doctor_update_email",
            context: {
                name: updatedDoctor.fullName.fname + " " + updatedDoctor.fullName.lname,
                otp: updatedDoctor.otp,
                link: this.config.get<string>('envConfig.be.updateMyEmailRedirectionLink') + "/verify_update_email" + `?token=${this.jwtService.generateToken({ email: updatedDoctor.email, id: updatedDoctor.id })}`
            }
        });

        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }

    async verifyUpdatedEmail(data: { email: string, id: number }, res: Response) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email } });
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }
        else {
            res.send(DoctorVerifyUpdateEmail(doctor.fullName.fname + " " + doctor.fullName.lname));
        }
    }

    async verifyDoctorEmailAfterUpdateOtp(data: { otp: string, email: string, id: number }): Promise<DoctorResponseType> {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email, id: data.id } });
        if (!doctor) {
            throw new NotFoundException("Doctor not found");
        }
        if (doctor.otp !== data.otp) {
            throw new ConflictException("Invalid OTP");
        }
        doctor.isVerified = true;
        doctor.otp = "";
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) {
            throw new ConflictException("Failed to update doctor email verification status");
        }
        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }

    async doctorResetPasswordRequest(data: doctorProfileResetPasswordDto) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email } });
        if (!doctor) throw new NotFoundException("Doctor not found");
        if (!doctor.isActive) throw new ConflictException("Doctor account is not active");
        if (!doctor.isVerified) throw new ConflictException("Doctor account is not verified");
        doctor.otp = this.otpService.generateComplexOtp(6);
        const updatedDoctor = await this.doctorRepo.save(doctor);
        if (!updatedDoctor) throw new ConflictException("Something went wrong while updating doctor data");
        this.emailService.sendMail({
            to: updatedDoctor.email,
            subject: "DRS - Password Reset Request",
            template: "doctor_reset_password_request",
            context: {
                name: updatedDoctor.fullName.fname + " " + updatedDoctor.fullName.lname,
                otp: updatedDoctor.otp
            }
        });
        return {
            fullName: `${updatedDoctor.fullName.fname} ${updatedDoctor.fullName.lname}`,
            isActive: updatedDoctor.isActive,
            isVerified: updatedDoctor.isVerified,
        };
    }


    async doctorResetPassword(data: doctorProfileResetPasswordDoDto) {
        const doctor = await this.doctorRepo.findOne({ where: { email: data.email }, relations: ['credential'] });
        if (!doctor) throw new NotFoundException("Doctor account not found!");
        if (!doctor.isActive) throw new ConflictException("Doctor account is not active");
        if (!doctor.isVerified) throw new ConflictException("Doctor account is not verified");
        if (data.otp !== doctor.otp) throw new ConflictException('Invalid OTP!');
        if (!doctor.credential) throw new ConflictException("Doctor credentials not found!");

        // Hash and update the new password
        doctor.credential.password = await this.bcryptService.bcryptHashingUtil(data.password);
        doctor.otp = "";

        // Save the updated credential and doctor
        await this.credintialService.saveDoctorCredential(doctor.credential);
        await this.doctorRepo.save(doctor);

        return {
            message: "Password reset successfully",
            fullName: `${doctor.fullName.fname} ${doctor.fullName.lname}`,
            isActive: doctor.isActive,
            isVerified: doctor.isVerified,
        };
    }
    async doctorProfileChooseCategory(data: doctorProfileChooseCategoryDto, id: number) {
        const category = await this.categoryService.findOneCategoryForDoctor(+data?.categoryId);
        if (!category) throw new NotFoundException("Category not found!!");

        const doctor = await this.doctorRepo.findOne({ where: { id } });
        if (!doctor) throw new NotFoundException("Doctor account not found!!");

        doctor.category = category;

        try {
            const savedDoctor = await this.doctorRepo.save(doctor);
            return savedDoctor;
        } catch (error) {
            throw new ConflictException("Failed to update doctor's category.");
        }
    }

    async doctorProfileUpdatePassword(data: updatePasswordDto, id: number): Promise<DoctorEntity> {
        const doctor = await this.doctorRepo.findOne({ where: { id }, relations: ['credential'] });
        if (!doctor) throw new NotFoundException("Doctor account not found!!");
        const { oldPassword, password } = data;
        const isPassvalid = await this.bcryptService.bcryptCompareUtil(oldPassword, doctor.credential.password);
        if (!isPassvalid) throw new ConflictException("Old password not match!!");
        doctor.credential.password = await this.bcryptService.bcryptHashingUtil(password);
        try {
            const savedDoctor = await this.doctorRepo.save(doctor);
            return savedDoctor;
        }
        catch (error) {
            throw new ConflictException("Failed to update doctor's password")
        }
    }

    async doctorProfileView(viewedDoctorId: number, data: DoctorProfileViewerDto) {
        const doctor = await this.doctorRepo.findOne({ where: { id: viewedDoctorId } });
        if (!doctor) throw new ConflictException("Account not found!!");

        // if viewer id
        const viewerDoctor = (data.viewerId) ? await this.doctorRepo.findOne({ where: { id: data.viewerId } }) : null;
        const readyViewerData = {
            ip: data.viewerIp.toString(),
            viewer: viewerDoctor ?? null,
            date: new Date()
        }

        const isViewerExist = Array.from(doctor.views).some(view =>
            view.ip.toString() === readyViewerData.ip.toString() ||
            (readyViewerData.viewer && view.viewer?.id === readyViewerData.viewer.id)
        );

        if (!isViewerExist) {
            doctor.views = [...(doctor.views || []), readyViewerData];
            await this.doctorRepo.save(doctor);
        }
    }

    async getMyData(id: number): Promise<DoctorEntity> {
        const doctor = await this.doctorRepo.findOne({ where: { id } });
        if (!doctor) throw new ConflictException("Something went wrong, Account not found!!");
        return doctor;
    }

    async clincAndWorkingDays(data: ClincAndWorkingDaysDto, doctorId: number) {
        const doctor = await this.doctorRepo.findOne({ where: { id: doctorId } });
        if (!doctor) throw new NotFoundException("Cannot found doctor account.");

        const { clinc, workingHours } = data;

        return await this.doctorRepo.manager.transaction(async (manager) => {
            doctor.clinc = {
                name: clinc.name || doctor.clinc.name,
                description: clinc.description || doctor.clinc.description,
                address: clinc.address || doctor.clinc.address,
                phone: clinc.phone || doctor.clinc.phone,
                whats: clinc.whats || doctor.clinc.whats,
                landingPhone: clinc.landingPhone || doctor.clinc.landingPhone,
                price: clinc.price || doctor.clinc.price,
                rePrice: clinc.rePrice || doctor.clinc.rePrice,
                imgs: doctor.clinc.imgs
            };

            const savedDoctor = await manager.save(doctor);

            await manager.delete(this.workingHoursRepo.target, { doctor: savedDoctor });

            const addWorkingHours = await Promise.all(
                workingHours.map((wh) =>
                    manager.save(
                        this.workingHoursRepo.create({
                            day: wh.day,
                            time: {
                                from: wh.time.from,
                                to: wh.time.to,
                            },
                            doctor: savedDoctor,
                        })
                    )
                )
            );




            if (!addWorkingHours || addWorkingHours.length === 0) {
                throw new ConflictException("Failed to add Clinic Working hours.")
            }

            return {
                doctor: savedDoctor,
                workingHours: addWorkingHours
            };
        });
    }


    async getAllDoctors(queryObj: GetDoctorQueriesDto) {
        const qb = this.doctorRepo.createQueryBuilder("doctor");

        if (queryObj.governorate) {
            qb.andWhere("doctor.address ->> 'governorate' = :gov", { gov: queryObj.governorate });
        }
        if (queryObj.center) {
            qb.andWhere("doctor.address ->> 'center' = :center", { center: queryObj.center });
        }
        if (queryObj.price) {
            const { from, to } = queryObj.price;
            if (from !== undefined) {
                qb.andWhere("(doctor.clinc ->> 'price')::numeric >= :from", { from });
            }
            if (to !== undefined) {
                qb.andWhere("(doctor.clinc ->> 'price')::numeric <= :to", { to });
            }
        }

        if (queryObj.search) {
            qb.andWhere(
                `(doctor.fullName ->> 'fname' ILIKE :search OR doctor.fullName ->> 'lname' ILIKE :search OR doctor.phone ILIKE :search OR doctor.email ILIKE :search)`,
                { search: `%${queryObj.search}%` }
            );
        }

        if (queryObj.orderKey && queryObj.orderValue) {
            qb.orderBy(`doctor.${queryObj.orderKey}`, queryObj.orderValue as "ASC" | "DESC");
        }

        const page = queryObj.page ? Number(queryObj.page) : 1;
        const limit = queryObj.limit ? Number(queryObj.limit) : 10;

        return paginate<DoctorEntity>(qb, { page, limit });


        return paginate<DoctorEntity>(qb, { page, limit });
    }


    async handleBlockDoctor(idNo: number): Promise<{ name: { fname: string; lname: string }, email: string; isActive: boolean }> {
        if (!idNo) throw new BadRequestException("Doctor id not found.");
        const doctor = await this.doctorRepo.findOne({
            where: { id: idNo }
        })
        if (!doctor) throw new ConflictException("Doctor not found.");

        const updatedDoctorStatus = (doctor.isActive).toString() == "true" ? false : true;
        doctor.isActive = updatedDoctorStatus as boolean;
        await this.doctorRepo.save(doctor);
        return {
            name: doctor.fullName,
            email: doctor.email,
            isActive: doctor.isActive
        }
    }
}
