import { BadRequestException, Body, Controller, InternalServerErrorException, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { DeviceDto } from './dtos/device.dto';

@ApiTags('devices')
@Serialize(DeviceDto)
@Controller({
  path: 'api/devices',
  version: '1',
})
export class DevicesController {
  constructor(
    private devicesService: DevicesService
  ) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: "The device was created successfully",
  })
  @ApiBadRequestResponse({
    description: "Failed to create device"
  })
  @ApiInternalServerErrorResponse({
    description: "Something went wrong while createing the device"
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
}
