import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { LoyaltyRewardType } from '../../loyalty_reward_type/entities/loyalty_reward_type.entity';

@Entity('loyalty_rewards')
export class Loyalty_Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.loyaltyRewards)
  user: User;

  @ManyToOne(() => LoyaltyRewardType, (type) => type.rewards)
  @JoinColumn({ name: 'loyalty_reward_type_id' })
  loyaltyRewardType: LoyaltyRewardType;

  @Column({ default: true })
  isActive: boolean;
}
