import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Loyalty_Reward } from 'src/loyalty_reward/entities/loyalty_reward.entity';

@Entity('loyalty_reward_types')
export class LoyaltyRewardType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @OneToMany(() => Loyalty_Reward, (reward) => reward.loyaltyRewardType)
  @JoinColumn({ name: 'loyalty_reward_id' })
  rewards: Loyalty_Reward[];
}
