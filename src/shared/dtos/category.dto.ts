import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MultiLangString {
    @ApiProperty({ example: 'category' })
    @IsString()
    @MinLength(3)
    en: string;

    @ApiProperty({ example: 'تصنيف' })
    @IsString()
    @MinLength(3)
    ar: string;
}

class MultiLangText {
    @ApiProperty({ example: 'category description' })
    @IsString()
    @MinLength(10)
    en: string;

    @ApiProperty({ example: 'وصف التصنيف' })
    @IsString()
    @MinLength(10)
    ar: string;
}

export class addCategoryDto {
    @ApiProperty({ type: MultiLangString })
    @ValidateNested()
    @Type(() => MultiLangString)
    title: MultiLangString;

    @ApiProperty({ type: MultiLangText })
    @ValidateNested()
    @Type(() => MultiLangText)
    description: MultiLangText;
}

export class updateCategoryDto {
    @ApiProperty({ type: MultiLangString })
    @ValidateNested()
    @Type(() => MultiLangString)
    title: MultiLangString;

    @ApiProperty({ type: MultiLangText })
    @ValidateNested()
    @Type(() => MultiLangText)
    description: MultiLangText;
}