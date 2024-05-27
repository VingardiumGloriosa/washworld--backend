import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { SelfWashHall } from '../../self_wash_hall/entities/self_wash_hall.entity';
import { WashHall } from '../../wash_hall/entities/wash_hall.entity';
import { History } from '../../history/entities/history.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bytea', nullable: true})
  photo: Buffer;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  mapsUrl: string;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6
  })
  longitude: number;

  @OneToMany(() => SelfWashHall, (selfWashHall) => selfWashHall.location)
  @JoinColumn({ name: 'self_wash_hall_id' })
  selfWashHalls: SelfWashHall[];

  @OneToMany(() => WashHall, (washHall) => washHall.location)
  @JoinColumn({ name: 'wash_hall_id' })
  washHalls: WashHall[];

  @OneToMany(() => History, history => history.location)
  @JoinColumn({ name: 'history_id' })
  history: History[];
}
