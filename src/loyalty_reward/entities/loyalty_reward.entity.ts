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
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.loyaltyRewards)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  status: string;

  @ManyToOne(() => LoyaltyRewardType)
  @JoinColumn({ name: 'loyalty_reward_type_id' })
  loyaltyRewardType: LoyaltyRewardType;
}
