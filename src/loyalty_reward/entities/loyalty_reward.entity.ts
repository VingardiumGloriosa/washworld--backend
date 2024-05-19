import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoyaltyRewardType } from 'src/loyalty_reward_type/entities/loyalty_reward_type.entity';

@Entity('loyalty_rewards')
export class Loyalty_Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loyaltyRewards)
  user: User;

  @ManyToOne(() => LoyaltyRewardType, (type) => type.rewards)
  loyaltyRewardType: LoyaltyRewardType;

  @Column({ default: true })
  isActive: boolean;
}
