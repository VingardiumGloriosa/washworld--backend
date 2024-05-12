import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { WashHall } from './wash_hall/entities/wash_hall.entity';
import { User } from './user/entities/user.entity';
import { SelfWashHall } from './self_wash_hall/entities/self_wash_hall.entity';
import { Membership } from './membership/entities/membership.entity';
import { Membership_Type } from './membership_type/entities/membership_type.entity';
import { Loyalty_Reward } from './loyalty_reward/entities/loyalty_reward.entity';
import { LoyaltyRewardType } from './loyalty_reward_type/entities/loyalty_reward_type.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [WashHall, User, SelfWashHall, Membership, Membership_Type, Loyalty_Reward, LoyaltyRewardType],
  synchronize: false,
});
