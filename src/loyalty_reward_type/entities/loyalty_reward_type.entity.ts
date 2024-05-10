import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Loyalty_Reward } from 'src/loyalty_reward/entities/loyalty_reward.entity';

@Entity('loyalty_reward_types')
export class LoyaltyRewardType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => Loyalty_Reward, (reward) => reward.loyaltyRewardType)
  rewards: LoyaltyReward[];
}
