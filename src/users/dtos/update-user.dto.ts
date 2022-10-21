import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'the user name of the user',
    default: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;
}
