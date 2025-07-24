import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { BlockAdminDtoResponse, CreateAdminDto, getAllAdminsQueryDto, LoginAdminDto, LoginAdminRequestDto, LoginRequestResponseDto, ResetPasswordDto, ResetPasswordRequestDto, SignupResponseDto, updateMyAdminDataDto, UpdateMyAdminDataResponseDto, UpdatePagesDto, updatePagesResponseDto, VerifyAdminDtoResponse, VerifyAdminSignupDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';




@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly bcryptService: BcryptUtilService,
    private readonly jwtService: JwtUtilService,
    private readonly mailService: MailUtilService,
    private readonly otpService: OtpUtilService,
    private readonly configService: ConfigService,
  ) { }

  async createAdmin(data: CreateAdminDto): Promise<SignupResponseDto> {
    const { name, password, email } = data;

    const hashedPassword = await this.bcryptService.bcryptHashingUtil(password);

    const newAdmin = this.adminRepo.create({ name, password: hashedPassword, email });

    if (!newAdmin) throw new ConflictException("Something went wrong");

    const otp = this.otpService.generateComplexOtp(6);

    newAdmin.otp = otp;
    this.mailService.sendMail({
      to: email,
      subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
      template: "admin_signup",
      context: {
        name,
        otp,
        otpLink: "https://www.google.com"
      }
    })

    const savedAdmin = await this.adminRepo.save(newAdmin);
    return {
      name: savedAdmin.name,
      role: savedAdmin.role
    }
  }

  async verifyAdminSignup(data: VerifyAdminSignupDto): Promise<SignupResponseDto> {
    const { email, otp } = data;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new NotFoundException("Something went wrong");
    if (admin.otp !== otp) throw new ConflictException("Something went wrong");
    admin.isActive = true;
    admin.otp = "";
    const savedAdmin = await this.adminRepo.save(admin);
    return {
      name: savedAdmin.name,
      role: savedAdmin.role
    }
  }

  async loginAdminRequest(data: LoginAdminRequestDto): Promise<LoginRequestResponseDto> {
    const { email } = data;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new NotFoundException("Something went wrong");
    const otp = this.otpService.generateComplexOtp(6);
    admin.otp = otp;
    this.mailService.sendMail({
      to: email,
      subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
      template: "admin_login",
      context: {
        name: admin.name,
        otp,
        otpLink: "https://www.google.com"
      }
    })
    await this.adminRepo.save(admin);
    return {
      name: admin.name,
      role: admin.role
    };
  }

  async loginAdmin(
    data: LoginAdminDto,
  ): Promise<{ token: string }> {
    const { email, password, otp } = data;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new NotFoundException("Something went wrong");
    if (admin.otp !== otp) throw new ConflictException("Something went wrong");
    console.log({ admin, password })
    const isPasswordValid = await this.bcryptService.bcryptCompareUtil(password, admin.password);
    if (!isPasswordValid) throw new ConflictException("Something went wrong");
    const { name, id } = admin;
    const token = this.jwtService.generateToken({ name, id, role: admin.role, isActive: admin.isActive, email });
    admin.otp = "";
    await this.adminRepo.save(admin);
    return { token }
  }


  async resetPasswordRequest(data: ResetPasswordRequestDto) {
    const admin = await this.adminRepo.findOne({ where: { email: data.email } })
    if (!admin) throw new NotFoundException("Something went wrong");
    const otp = this.otpService.generateComplexOtp(6);
    admin.otp = otp;
    this.mailService.sendMail({
      to: data.email,
      subject: "بريد الكتروني اوتاماتيكي موجهه من موقع DRS يرجي اتباع الخطوات ادناه.",
      template: "admin_reset_password_request",
      context: {
        name: admin.name,
        otp,
        otpLink: "https://www.google.com"
      }
    })
    await this.adminRepo.save(admin);
    return {}
  }

  async resetPassword(data: ResetPasswordDto) {
    const admin = await this.adminRepo.findOne({ where: { email: data.email } });
    if (!admin) throw new NotFoundException("Something went wrong");
    if (admin.otp !== data.otp) throw new ConflictException("Something went wrong");
    const hashedPassword = await this.bcryptService.bcryptHashingUtil(data.password);
    admin.password = hashedPassword;
    admin.otp = "";
    await this.adminRepo.save(admin);
    return {}
  }

  // update my data (an admin update hist data)
  async updateMyAdminData(
    data: updateMyAdminDataDto,
    id: number
  ): Promise<UpdateMyAdminDataResponseDto> {
    const { name, email, password } = data;

    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new ConflictException("Admin not found or an error occurred.");
    }

    // Update name if changed
    if (name && name !== admin.name) {
      admin.name = name;
    }

    // Update email if changed
    if (email && email !== admin.email) {
      admin.email = email;

      const otp = this.otpService.generateComplexOtp(6);
      admin.otp = otp;
      const hashedOtp = await this.bcryptService.bcryptHashingUtil(otp);
      const token = this.jwtService.generateToken({ otp: hashedOtp, email }, "1h");
      await this.mailService.sendMail({
        to: email,
        subject: "بريد الكتروني اوتوماتيكي موجه من موقع DRS، يرجى اتباع الخطوات أدناه.",
        template: "update_my_admin_data",
        context: {
          name: admin.name,
          redirectLink: this.configService.get<string>('envConfig.links.updateMyEmailRedirectionLink') + token,
        },
      });
      admin.isVerified = false;
    }

    // Update password if changed
    if (password) {
      const isSamePassword = await this.bcryptService.bcryptCompareUtil(
        password,
        admin.password
      );

      if (!isSamePassword) {
        admin.password = await await this.bcryptService.bcryptHashingUtil(password);
      }

    }

    const savedAdmin = await this.adminRepo.save(admin);

    return {
      name: savedAdmin.name,
      role: savedAdmin.role,
    };
  }

  async verifyAccountIfUpdated(data: { otp: string, email: string }): Promise<UpdateMyAdminDataResponseDto> {
    const { otp, email } = data;

    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) throw new NotFoundException("Something went wrong");
    const isOtpCorrect = await this.bcryptService.bcryptCompareUtil(admin.otp, otp);
    if (!isOtpCorrect) throw new ConflictException("Something went wrong");
    admin.isVerified = true;
    admin.otp = "";
    await this.adminRepo.save(admin);
    return {
      name: admin.name,
      role: admin.role
    }
  }

  async getMyAdminData(id: number): Promise<AdminEntity> {
    const admin = await this.adminRepo.findOne({
      where: { id }, select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        isActive: true,
        role: true,
        pages: true
      }
    });
    if (!admin) throw new NotFoundException("Something went wrong");
    return admin;
  }

  async blockAdmin(id: number): Promise<BlockAdminDtoResponse> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Something went wrong");
    admin.isActive = !admin.isActive;
    await this.adminRepo.save(admin);
    return {
      isActive: admin.isActive,
      name: admin.name,
      role: admin.role
    }
  }

  async verifyAdmin(id: number): Promise<VerifyAdminDtoResponse> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Something went wrong");
    admin.isVerified = !admin.isVerified;
    await this.adminRepo.save(admin);
    return {
      isVerified: admin.isVerified,
      name: admin.name,
      role: admin.role
    }
  }

  async updatePages(data: UpdatePagesDto, id: number): Promise<updatePagesResponseDto> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Something went wrong");
    admin.pages = data.pages;
    await this.adminRepo.save(admin);
    return {
      pages: data.pages,
      name: admin.name,
      role: admin.role
    }
  }

  async getOneAdmin(id: number): Promise<AdminEntity> {
    const admin = await this.adminRepo.findOne({
      where: { id }, select: {
        name: true, email: true, pages: true, isActive: true, isVerified: true, role: true
      }
    });
    if (!admin) throw new NotFoundException("Something went wrong");
    return admin;
  }

  async getAllAdmins(queries: getAllAdminsQueryDto): Promise<Pagination<AdminEntity>> {
    const adminsQuery = this.adminRepo.createQueryBuilder('admin');

    adminsQuery
      .select(["admin.id", "admin.name", "admin.email", "admin.isActive", "admin.isVerified"])
      .orderBy("admin.id", queries.sorting ?? "ASC");

    // Filtering conditions
    if (queries?.isActive !== undefined) {
      adminsQuery.andWhere("admin.isActive = :isActive", { isActive: queries.isActive });
    }

    if (queries?.isVerified !== undefined) {
      adminsQuery.andWhere("admin.isVerified = :isVerified", { isVerified: queries.isVerified });
    }

    if (queries?.search) {
      adminsQuery.andWhere(
        "(admin.name LIKE :search OR admin.email LIKE :search)",
        { search: `%${queries.search}%` }
      );
    }

    return paginate<AdminEntity>(adminsQuery, {
      page: queries.page ?? 1,
      limit: queries.limit ?? 10,
      route: "/admin/all",
    });
  }

}