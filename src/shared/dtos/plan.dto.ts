import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MultiLangString {
  @ApiProperty({ example: 'plan' })
  @IsString()
  @MinLength(3)
  en: string;

  @ApiProperty({ example: 'خطة' })
  @IsString()
  @MinLength(3)
  ar: string;
}

class MultiLangText {
  @ApiProperty({ example: 'plan description' })
  @IsString()
  @MinLength(10)
  en: string;

  @ApiProperty({ example: 'وصف الخطة' })
  @IsString()
  @MinLength(10)
  ar: string;
}

class MultiLangPrice {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  en: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  ar: number;
}

export class addPlanDto {
  @ApiProperty({ type: MultiLangString })
  @ValidateNested()
  @Type(() => MultiLangString)
  title: MultiLangString;

  @ApiProperty({ type: MultiLangText })
  @ValidateNested()
  @Type(() => MultiLangText)
  description: MultiLangText;

  @ApiProperty({ type: MultiLangPrice })
  @ValidateNested()
  @Type(() => MultiLangPrice)
  price: MultiLangPrice;
}


export class updatePlanDto{
  @ApiProperty({ type: MultiLangString })
  @ValidateNested()
  @Type(() => MultiLangString)
  title: MultiLangString;

  @ApiProperty({ type: MultiLangText })
  @ValidateNested()
  @Type(() => MultiLangText)
  description: MultiLangText;

  @ApiProperty({ type: MultiLangPrice })
  @ValidateNested()
  @Type(() => MultiLangPrice)
  price: MultiLangPrice;
}