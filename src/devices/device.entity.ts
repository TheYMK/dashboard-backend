import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum DEVICE_STATUS {
  ONLINE = 'online',
  OFFLINE = 'offline',
  UNTRACKED = 'untracked',
}
@Entity()
export class Device {
  // autogenerated id
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  device_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  device_description: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  latitude: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  longitude: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  updated_at: Date;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: DEVICE_STATUS,
    default: DEVICE_STATUS.OFFLINE,
    nullable: false,
  })
  status: DEVICE_STATUS;

  @ManyToOne(() => User, (user) => user.devices)
  user: User

  @AfterInsert()
  logInsert() {
    console.log('Device inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Device updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Device removed:', this);
  }
}
