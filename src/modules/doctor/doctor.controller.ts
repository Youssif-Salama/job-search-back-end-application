import { BadRequestException, Body, Controller, Get, HttpCode, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AddDoctorDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, LoginDoctorDto, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorService } from './doctor.service';
import { Public } from 'src/common/decorators/public.decorator';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiHideProperty } from '@nestjs/swagger';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { Response } from 'express';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService, private readonly jwtService: JwtUtilService) { }

    @Post('/signup')
    @Public()
    async doctorSignup(@Body() data: AddDoctorDto): Promise<DoctorResponseType> {
        return this.doctorService.doctorSignup(data);
    }

    @Post('verify-signup')
    @Public()
    async doctorProfileVerifyAccountEmail(@Body() data: doctorProfleVerifeAccountEmailDto) {
        return this.doctorService.doctorProfileVerifyAccountEmail(data);
    }

    @Post('/login')
    @Public()
    @HttpCode(200)
    async doctorLogin(@Body() data: LoginDoctorDto): Promise<{ token: string }> {
        return this.doctorService.doctorLogin(data);
    }

    @Put('/update-my-profile')
    @ApiBearerAuth('access-token')
    async updateMyDoctorProfileRawData(@Body() data: DoctorUpdateRawDataDto, @Req() req: Request): Promise<DoctorResponseType> {
        const { id } = req['user'];
        return this.doctorService.updateMyDoctorProfileRawData(data, id);
    }

    @Get('verify-update-email')
    @Public()
    async verifyUpdatedEmail(@Res() res: Response, @Query('token') token: string) {
        const decoded = this.jwtService.verifyToken(token);
        if (!decoded || !decoded.email || !decoded.id) {
            return res.status(400).send('Invalid credentials!!!');
        }
        return this.doctorService.verifyUpdatedEmail({ email: decoded.email, id: +decoded.id }, res)
    }

    @Public()
    @Post('verify_doctor_email_after_update_otp_using')
    @ApiExcludeEndpoint()
    async verifyDoctorEmailAfterUpdateOtp(@Body('otp') otp: string, @Query('token') token: string): Promise<DoctorResponseType> {
        const decoded = this.jwtService.verifyToken(token);
        if (!decoded || !decoded.email || !decoded.id) {
            throw new BadRequestException('Invalid credentials!!!');
        }
        return this.doctorService.verifyDoctorEmailAfterUpdateOtp({ otp, email: decoded.email, id: +decoded.id });
    }

    @Public()
    @Post('reset-password-request')
    async doctorResetPasswordRequest(@Body() data: doctorProfileResetPasswordDto) {
        return this.doctorService.doctorResetPasswordRequest(data);
    }

    @Public()
    @Post('reset-password')
    async doctorResetPassword(@Body() data: doctorProfileResetPasswordDoDto) {
        return this.doctorService.doctorResetPassword(data);
    }

    @Put('choose-category')
    @HttpCode(200)
    async chooseCategory(@Body() data: doctorProfileChooseCategoryDto, @Req() req: Request) {
        const id = req['user'].id;
        return this.doctorService.doctorProfileChooseCategory(data, +id);
    }

    @Patch('update-password')
    async doctorProfileUpdatePassword(@Body() data: updatePasswordDto, @Req() req: Request) {
        const { id } = req['user'];
        return this.doctorService.doctorProfileUpdatePassword(data, +id);
    }

}
