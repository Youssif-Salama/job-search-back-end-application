import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

type DaysEn = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
type DaysAr = 'السبت' | 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس' | 'الجمعة';


class DayLocalization {
    @ApiProperty({ example: "monday" })
    en: DaysEn;

    @ApiProperty({ example: "الإثنين" })
    ar: DaysAr;
}

class Time {
    @ApiProperty({ example: "09:00" })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({ example: "17:00" })
    @IsString()
    @IsNotEmpty()
    to: string;
}


export class AddWoringHourDto {
    @ApiProperty({
        type: DayLocalization,
        required: true
    })
    @ValidateNested()
    @Type(() => DayLocalization)
    day: DayLocalization;

    @ApiProperty({
        type: Time,
        required: true
    })
    @ValidateNested()
    @Type(() => Time)
    time: Time;
}


