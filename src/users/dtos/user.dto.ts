import { Expose } from 'class-transformer';
import { UserRole } from '../user.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  role: UserRole;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
