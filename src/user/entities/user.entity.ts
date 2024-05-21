import { Car } from 'src/car/entities/car.entity';
import { History } from 'src/history/entities/history.entity';
import { Loyalty_Reward } from 'src/loyalty_reward/entities/loyalty_reward.entity';
import { Membership } from 'src/membership/entities/membership.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'bytea', nullable: true })
  photo: Buffer;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', name: 'full_name' })
  fullName: string;

  @OneToOne(() => Membership, membership => membership.user)
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  @OneToMany(() => Car, (car) => car.user)
  @JoinColumn({ name: 'car_id' })
  cars: Car[];

  @OneToMany(() => Loyalty_Reward, (reward) => reward.user)
  @JoinColumn({ name: 'loyalty_reward_id' })
  loyaltyRewards: Loyalty_Reward[];

  @OneToMany(() => History, history => history.user)
  @JoinColumn({ name: 'history_id' })
  history: History[];
}
