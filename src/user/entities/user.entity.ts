import { Car } from 'src/car/entities/car.entity';
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

  @Column({ type: 'text' })
  fullName: string;

  @OneToOne(() => Membership)
  @JoinColumn({ name: 'membership_id' })
  membership: Membership;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @OneToMany(() => Loyalty_Reward, (reward) => reward.user)
  loyaltyRewards: Loyalty_Reward[];
}
