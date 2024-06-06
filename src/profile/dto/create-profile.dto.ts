import { IsString, IsDate, IsArray, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  about: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  displayName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['Male', 'Female'])
  gender: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight: number;
}
