import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SelfWashHall } from 'src/self_wash_hall/entities/self_wash_hall.entity';
import { WashHall } from 'src/wash_hall/entities/wash_hall.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  photo_url: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  maps_url: string;

  @OneToMany(() => SelfWashHall, (selfWashHall) => selfWashHall.location)
  selfWashHalls: SelfWashHall[];

  @OneToMany(() => WashHall, (washHall) => washHall.location)
  washHalls: WashHall[];
}