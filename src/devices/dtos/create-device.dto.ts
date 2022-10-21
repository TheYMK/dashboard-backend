import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    type: String,
    description: 'the device name',
    default: 'device 1',
  })
  @IsString()
  @IsNotEmpty()
  device_name: string;
  
  @ApiProperty({
    type: String,
    description: 'the device name',
    default: 'device 1',
  })
  @IsString()
  @IsNotEmpty()
  device_description: string;

  @ApiProperty({
    type: String,
    description: 'the latitude coordinate',
    default: '0',
  })
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty({
    type: String,
    description: 'the longitude coordinate',
    default: '0',
  })
  @IsString()
  @IsNotEmpty()
  longitude: string;
}
