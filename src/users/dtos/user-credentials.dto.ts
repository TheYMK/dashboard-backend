import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @ApiProperty({
    type: String,
    description: 'the username of the user',
    default: 'johndoe',
  })
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
}
