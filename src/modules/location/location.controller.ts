import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiParam } from '@nestjs/swagger';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { };

    @Get('governorates')
    @Public()
    async getAllGovernorates() {
        return this.locationService.getAllGovernorates();
    }

    @Get('cities')
    @Public()
    async getAllCities() {
        return this.locationService.getAllCities();
    }

    @Get('governorates/:id/cities')
    @Public()
    @ApiParam({
        name: "id",
        description: "governorate id",
        type: "number",
        required: true
    })
    async getAllGovernorateCities(@Param('id') id: string) {
        const idNo = Number(id);
        return this.locationService.getCitiesByGovernorateId(idNo);
    }
}
