import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ContactUsDto, ResendOtpCodeDto, ResendOtpResponseDto } from 'src/shared/dtos/common.dto';
import { CommonService } from './common.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('common')
export class CommonController {
    constructor(private readonly commonService: CommonService) { }

    @Post('/resend-otp-code')
    @Public()
    @HttpCode(200)
    async resendOtpCode(@Body() data: ResendOtpCodeDto): Promise<ResendOtpResponseDto> {
        return this.commonService.resendOtpCode(data);
    }

    @Get('signup-essentials')
    @Public()
    @HttpCode(200)
    async getSignupEssentials() {
        return this.commonService.createNewAccountEssentials();
    }

    @Post('contact-us')
    @Public()
    @HttpCode(200)
    async contactUs(@Body() data: ContactUsDto) {
        return this.commonService.contactUs(data);
    }

    @Get('analytics')
    @HttpCode(200)
    @ApiBearerAuth("access-token")
    async getDashboardAnalytics() {
        const analytics = await this.commonService.getDashboardAnalytics();
        return analytics;
    }

}
