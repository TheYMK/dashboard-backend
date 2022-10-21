import { Expose, Transform } from 'class-transformer';
import { DEVICE_STATUS } from '../device.entity';

export class DeviceDto {
  @Expose()
  id: number;

  @Expose()
  device_name: string;

  @Expose()
  device_description: string;

  @Expose()
  latitude: string;

  @Expose()
  longitude: string;

  @Expose()
  enabled: boolean;

  @Expose()
  status: DEVICE_STATUS;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
