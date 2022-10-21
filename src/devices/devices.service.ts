import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(@InjectRepository(Device) private repo: Repository<Device>) {}

  async create(device: CreateDeviceDto, user: User) {
    try {
      const newDevice = this.repo.create(device);
      newDevice.user = user;
      const createdDevice = await this.repo.save(newDevice);
      return createdDevice;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Failed to create device');
    }
  }

  async findOne(id: number, user: User) {
    const device = await this.repo.findOne(id, {
      relations: ['user'],
      where: {
        user: user,
      },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  async findAll(user: User) {
    try {
      const devices = await this.repo.find({
        relations: ['user'],
        where: {
          user: user,
        },
      });
      return devices;
    } catch (err) {
      throw new BadRequestException('Failed to find the devices');
    }
  }

  async update(id: number, attrs: Partial<UpdateDeviceDto>, user: User) {
    const foundDevice = await this.findOne(id, user);

    if (!foundDevice) {
      throw new NotFoundException('Device not found');
    }

    Object.assign(foundDevice, attrs);

    try {
      const udpatedDevice = await this.repo.save(foundDevice);
      return udpatedDevice;
    } catch (err) {
      throw new BadRequestException('Failed to update the device');
    }
  }

  async delete(id: number, user: User) {
    const device = await this.findOne(id, user);

    if (!device) {
      throw new NotFoundException('device not found');
    }

    try {
      const removedDevice = await this.repo.remove(device);
      return removedDevice;
    } catch (err) {
      throw new BadRequestException('Failed to delete the device');
    }
  }
}
