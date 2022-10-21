import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SuperAdminGuard } from 'src/guards/superadmin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { UserDto } from './dtos/user.dto';
import { User, UserRole } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Serialize(UserDto)
@Controller({
  path: 'api/auth',
  version: '1',
})
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'The user was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token | Email in use | Failed to create a user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while creating the user',
  })
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService
      .register(body)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            if (err.response?.message === 'Invalid token') {
              throw new BadRequestException('Invalid token');
            } else if (err.response?.message === 'Email in use') {
              throw new BadRequestException('Email in use');
            } else {
              throw new BadRequestException('Failed to create user');
            }
          default:
            throw new InternalServerErrorException(
              'Something went wrong while creating the user',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Post('/signin')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user was successfully logged in',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Incorrect credentials' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while logging in the user',
  })
  async signin(@Body() body: UserCredentialsDto, @Session() session: any) {
    return this.authService
      .signin(body.username, body.password)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('User not found');
          case 401:
            throw new UnauthorizedException('Incorrect credentials');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while logging in the user',
            );
        }
      });
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The user was updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update user',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the user',
  })
  updateUser(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    return this.userService
      .update(user, body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to update user');
          case 404:
            throw new NotFoundException('User not found');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the user',
            );
        }
      });
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'The user was successfully fetched' })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/allUsers')
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'Users were found successfully',
  })
  getAllUsers(@CurrentUser() user: User) {
    return this.userService.findAll(UserRole.USER);
  }

  @Get('/allAdmins')
  @UseGuards(SuperAdminGuard)
  @ApiOkResponse({
    description: 'Admins were found successfully',
  })
  getAllAdmins(@CurrentUser() user: User) {
    return this.userService.findAll(UserRole.ADMIN);
  }

  // LAST TIME REVIEWED: 2022-04-09
  @Post('/signout')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The user was successfully logged out' })
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
