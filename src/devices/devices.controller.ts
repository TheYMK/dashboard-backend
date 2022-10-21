import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { DeviceDto } from './dtos/device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';

@ApiTags('devices')
@Serialize(DeviceDto)
@Controller({
  path: 'api/devices',
  version: '1',
})
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The device was created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to create device',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while createing the device',
  })
  async createDevice(@Body() body: CreateDeviceDto, @CurrentUser() user: User) {
    return this.devicesService
      .create(body, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to create device');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while createing the device',
            );
        }
      });
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'Devices were found successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to find the devices',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while fetching devices',
  })
  async getDevices(@CurrentUser() user: User) {
    return this.devicesService
      .findAll(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Failed to find the devices');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while fetching the devices',
            );
        }
      });
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The device was updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to update the device',
  })
  @ApiNotFoundResponse({
    description: 'Device not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while updating the device',
  })
  async updateDevice(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDeviceDto,
    @CurrentUser() user: User,
  ) {
    return this.devicesService
      .update(id, body, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new BadRequestException('Device not found');
          case 400:
            throw new BadRequestException('Failed to update the device');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while updating the devices',
            );
        }
      });
  }
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The device was deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Device not found',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete the device',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while deleting the device',
  })
  async deleteDevice(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.devicesService
      .delete(id, user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('Device not found');
          case 400:
            throw new BadRequestException('Failed to delete the device');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while deleting the device',
            );
        }
      });
  }
}
