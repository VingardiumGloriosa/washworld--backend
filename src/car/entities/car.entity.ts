import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cars)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column({ type: 'text', name: 'license_plate' })
  licensePlate: string;
}
