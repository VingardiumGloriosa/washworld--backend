import { Location } from '../../location/entities/location.entity';
import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, user => user.history)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Location, location => location.history)
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
