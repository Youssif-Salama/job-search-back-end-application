import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Binary } from 'typeorm';

class MultiLangString {
    @ApiProperty({ example: 'category' })
    @IsString()
    @IsNotEmpty()
    en: string;

    @ApiProperty({ example: 'فئة' })
    @IsString()
    @IsNotEmpty()
    ar: string;
}

class MultiLangText {
    @ApiProperty({ example: 'category description' })
    @IsString()
    @IsNotEmpty()
    en: string;

    @ApiProperty({ example: 'وصف الفئة' })
    @IsString()
    @IsNotEmpty()
    ar: string;
}





export class CategoryDto {
    @ApiProperty({ type: MultiLangString })
    @ValidateNested()
    @Type(() => MultiLangString)
    @IsNotEmpty()
    title: MultiLangString;

    @ApiProperty({ type: MultiLangText })
    @ValidateNested()
    @Type(() => MultiLangText)
    @IsNotEmpty()
    description: MultiLangText;


}

export class ImgDto {
    @ApiProperty({ name: 'img', description: 'category img', type: 'string', format: 'binary' })
    img: Binary;
}


export class ImgType {
    url: string;
    public_id: string
}


export class addCategoryDto extends CategoryDto {
    @ApiProperty({ name: 'img', description: 'category img', type: 'string', format: 'binary' })
    img: Binary
}

export class updateCategoryDto extends CategoryDto {
    @ApiProperty({ name: 'img', description: 'category img', type: 'string', format: 'binary' })
    img: Binary
}

export class CategoryFormDataDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}