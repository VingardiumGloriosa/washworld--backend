import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Membership } from './membership.entity';
import { Car } from './car.entity';
import { LoyaltyReward } from './loyalty_reward.entity';

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

  @Column({ type: 'text' })
  full_name: string;

  @ManyToOne(() => Membership, (membership) => membership.users)
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @OneToMany(() => LoyaltyReward, (reward) => reward.user)
  loyaltyRewards: LoyaltyReward[];
}
