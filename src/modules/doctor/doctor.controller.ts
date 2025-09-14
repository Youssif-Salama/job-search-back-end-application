import { BadRequestException, Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Req, Res } from '@nestjs/common';
import { AddDoctorDto, ClincAndWorkingDaysDto, doctorProfileChooseCategoryDto, doctorProfileResetPasswordDoDto, doctorProfileResetPasswordDto, DoctorProfileViewerDto, doctorProfleVerifeAccountEmailDto, DoctorUpdateRawDataDto, GetDoctorQueriesDto, LoginDoctorDto, orderKeyEnums, updatePasswordDto } from 'src/shared/dtos/doctor.dto';
import { DoctorService } from './doctor.service';
import { Public } from 'src/common/decorators/public.decorator';
import { DoctorResponseType } from 'src/shared/type/doctor.type';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { Request, Response } from 'express';
import { DoctorEntity, FileClass } from 'src/shared/entities/doctors.entity';

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
    async doctorLogin(@Body() data: LoginDoctorDto): Promise<{ token: string; doctor: { name: { fname: string; lname: string }; email: string; img: string | FileClass } }> {
        return this.doctorService.doctorLogin(data);
    }

    @Post('/clinc-and-working-hours')
    @ApiBearerAuth('access-token')
    async addClincAndWorkingHours(@Body() data: ClincAndWorkingDaysDto, @Req() req: Request) {
        const { id } = req['user'];
        return this.doctorService.clincAndWorkingDays(data, id);
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

    @Patch(":id/view")
    @HttpCode(204)
    @ApiParam({
        name: "id",
        description: "profile id",
        required: true,
        example: 1,
        type: "number"
    })
    async doctorProfileView(@Param('id') id: string, @Body() data: DoctorProfileViewerDto) {
        return this.doctorService.doctorProfileView(+id, data)
    }


    @Get('/my-data')
    @ApiBearerAuth('access-token')
    async getMyData(@Req() req: Request): Promise<DoctorEntity> {
        const { id } = req['user'];
        return this.doctorService.getMyData(id);
    }

    @Get()
    @ApiQuery({ name: "page", description: "pagination", required: false, example: 1 })
    @ApiQuery({ name: "limit", description: "pagination", required: false, example: 10 })
    @ApiQuery({ name: "orderKey", required: false, enum: orderKeyEnums })
    @ApiQuery({ name: "orderValue", required: false, enum: ["ASC", "DESC"] })
    @Public()
    async getAllDoctors(@Query() queries: GetDoctorQueriesDto) {
        const { orderKey, orderValue, search, best, price, governorate, center, page, limit } = queries;

        const directDoctoFilters = {
            page: Number(page),
            limit: Number(limit),
        };


        orderKey && (directDoctoFilters["orderKey"] = orderKey);
        orderValue && (directDoctoFilters["orderValue"] = orderValue);
        search && (directDoctoFilters["search"] = search);
        price && (directDoctoFilters["price"] = price);
        best && (directDoctoFilters["best"] = best);
        governorate && (directDoctoFilters["governorate"] = governorate);
        center && (directDoctoFilters["center"] = center);

        return this.doctorService.getAllDoctors(directDoctoFilters);
    }

    @Patch("/handle-block/:id")
    @ApiParam({ name: "id", type: String })
    @ApiBearerAuth("access-token")
    async handleBlockDoctor(@Param("id") id: string): Promise<{ isActive: boolean }> {
        const idNo = +id;
        return this.doctorService.handleBlockDoctor(idNo);
    }

}
