import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsJWT,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'the user name of the user',
    default: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'the password of the user',
    default: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    enum: UserRole,
    description: 'admin | superadmin | user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
