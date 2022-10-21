import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dtos/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private repo: Repository<Device>){}
    
  
    async create(device: CreateDeviceDto, user: User) {
      try {
        const newDevice = this.repo.create(device);
        newDevice.user = user;
        const createdDevice = await this.repo.save(newDevice);
        return createdDevice;
      }catch(err) {
        console.log(err)
        throw new BadRequestException("Failed to create device");
      }
    }

    async findAll() {
      try {
        const devices = await this.repo.find({
          relations: ['user'],
        });
  
        return devices;
      } catch (err) {
        throw new BadRequestException('Failed to get the devices');
      }
    }
}
