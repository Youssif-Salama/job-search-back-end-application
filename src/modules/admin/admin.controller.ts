import { Body, Controller, Get, Param, Query, Post, Put, Req, Res, UsePipes } from '@nestjs/common';
import {
  CheckAdminExistPipe
} from 'src/common/pipes/check.pipes';
import { BlockAdminDtoResponse, CreateAdminDto, getAllAdminsQueryDto, LoginAdminDto, LoginAdminRequestDto, LoginRequestResponseDto, ResetPasswordDto, ResetPasswordRequestDto, SignupResponseDto, updateMyAdminDataDto, UpdateMyAdminDataResponseDto, UpdatePagesDto, updatePagesResponseDto, VerifyAdminDtoResponse, VerifyAdminSignupDto } from 'src/shared/dtos/admin.dto';
import { AdminService } from './admin.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiParam, ApiQuery, getSchemaPath } from '@nestjs/swagger';
import { JwtUtilService } from 'src/common/utils/jwt.utils';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly jwtService: JwtUtilService) { }

  @Public()
  @Post('/signup')
  @UsePipes(CheckAdminExistPipe)
  async create(@Body() data: CreateAdminDto): Promise<SignupResponseDto> {
    return this.adminService.createAdmin(data);
  }

  @Public()
  @Post('/verify-signup')
  async verifySignup(@Body() data: VerifyAdminSignupDto): Promise<SignupResponseDto> {
    return this.adminService.verifyAdminSignup(data);
  }

  @Public()
  @Post('/login-request')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async logAdminRequest(@Body() data: LoginAdminRequestDto): Promise<LoginRequestResponseDto> {
    console.log({ data })
    return this.adminService.loginAdminRequest(data);
  }


  @Public()
  @Post('/login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async login(
    @Body() data: LoginAdminDto,
  ): Promise<{ token: string }> {
    return this.adminService.loginAdmin(data);
  }

  @Public()
  @Post('/reset-password-request')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async resetPasswordRequest(@Body() data: ResetPasswordRequestDto) {
    return this.adminService.resetPasswordRequest(data);
  }

  @Public()
  @Put('/reset-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } })

  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.adminService.resetPassword(data);
  }

  @Put('/update-my-data/:id')
  @ApiBearerAuth('access-token')
  updateMyAdminData(@Body() data: updateMyAdminDataDto, @Req() req) {
    return this.adminService.updateMyAdminData(data, req.user.id);
  }

  @Put('/block/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    type: "number"
  })
  blockAdmin(@Param('id') id: number): Promise<BlockAdminDtoResponse> {
    return this.adminService.blockAdmin(id);
  }

  @Put('/pages/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    type: "number"
  })
  updatePages(@Body() data: UpdatePagesDto, @Param('id') id: number): Promise<updatePagesResponseDto> {
    return this.adminService.updatePages(data, id);
  }


  @Put('/verify/:id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    type: "number"
  })
  verifyAdmin(@Param('id') id: number): Promise<VerifyAdminDtoResponse> {
    return this.adminService.verifyAdmin(id);
  }


  @Public()
  @Get("/verify-account-if-updated/:token")
  @ApiExcludeEndpoint()
  verifyAccountIfUpdated(@Param("token") token: string, @Res() res): Promise<UpdateMyAdminDataResponseDto> {
    const decodedToken = this.jwtService.verifyToken(token);
    const result: any = this.adminService.verifyAccountIfUpdated(decodedToken);
    if (result.statusCode = 200) res.redirect("https://www.google.com")
    return result;
  }

  @Get('/my-data')
  @ApiBearerAuth('access-token')
  getMyAdminData(@Req() req) {
    return this.adminService.getMyAdminData(req.user.id);
  }

  @Get('/all')
  @ApiBearerAuth('access-token')
  getAll(@Query() queries: getAllAdminsQueryDto) {
    return this.adminService.getAllAdmins(queries);
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiParam({
    name: 'id',
    required: true,
    type: "number"
  })
  getOne(@Param('id') id: string) {
    return this.adminService.getOneAdmin(+id);
  }
}

