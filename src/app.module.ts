import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MembershipModule } from './membership/membership.module';
import { WashHallModule } from './wash_hall/wash_hall.module';
import { SelfWashHallModule } from './self_wash_hall/self_wash_hall.module';
import { LocationModule } from './location/location.module';
import { LoyaltyRewardTypeModule } from './loyalty_reward_type/loyalty_reward_type.module';
import { LoyaltyRewardModule } from './loyalty_reward/loyalty_reward.module';
import { CarModule } from './car/car.module';
import { MembershipTypeModule } from './membership_type/membership_type.module';
import { DistancesModule } from './distances/distances.module';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './jwt/auth.module';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*.js'],
        cli: {
          migrationsDir: '../migrations',
        },
        synchronize: false
      }),
      inject: [ConfigService],
    }),
    MembershipModule,
    MembershipTypeModule,
    CarModule,
    LoyaltyRewardModule,
    LoyaltyRewardTypeModule,
    LocationModule,
    SelfWashHallModule,
    WashHallModule,
    DistancesModule,
    HistoryModule,
    DistancesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
