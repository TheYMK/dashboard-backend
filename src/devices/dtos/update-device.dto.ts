import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsJWT,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { DEVICE_STATUS } from '../device.entity';

export class UpdateDeviceDto {
  @ApiProperty({
    type: String,
    description: 'the device name',
    default: 'device 1',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  device_name: string;

  @ApiProperty({
    type: String,
    description: 'the device name',
    default: 'device 1',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  device_description: string;

  @ApiProperty({
    type: String,
    description: 'the latitude coordinate',
    default: '0',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  latitude: string;

  @ApiProperty({
    type: String,
    description: 'the longitude coordinate',
    default: '0',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  longitude: string;

  @ApiProperty({
    type: Boolean,
    description: 'Is the device enabled',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  enabled: boolean;

  @ApiProperty({
    type: String,
    enum: DEVICE_STATUS,
    description: 'ONLINE | OFFLINE',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(DEVICE_STATUS)
  @IsOptional()
  status: DEVICE_STATUS;
}
