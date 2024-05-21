import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity('wash_halls')
export class WashHall {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Location, (location) => location.washHalls)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ type: 'timestamp', default: null, nullable: true, name: 'finish_time' })
  finishTime?: Date | null;

  @Column({ type: 'boolean', default: false, name: 'is_out_of_service' })
  isOutOfService: boolean;
}
