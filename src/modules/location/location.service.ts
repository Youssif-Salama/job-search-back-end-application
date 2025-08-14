import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocationService {
    private governorates = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../../shared/data/governorates.json'),
            'utf8'
        )
    );

    private cities = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, '../../shared/data/cities.json'),
            'utf8'
        )
    );

    getAllGovernorates() {
        return this.governorates;
    }

    getAllCities() {
        return this.cities;
    }

    getCitiesByGovernorateId(governorateId: number) {
        return this.cities.filter(
            (city) => Number(city.governorate_id) === governorateId
        );
    }
}
