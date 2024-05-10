import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity('self_wash_halls')
export class SelfWashHall {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Location, (location) => location.selfWashHalls)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ type: 'boolean', default: false })
  is_in_use: boolean;

  @Column({ type: 'boolean', default: false })
  is_out_of_service: boolean;
}
