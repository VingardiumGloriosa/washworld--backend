import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Car } from '../../car/entities/car.entity';
import { History } from '../../history/entities/history.entity';
import { Loyalty_Reward } from '../../loyalty_reward/entities/loyalty_reward.entity';
import { Membership } from '../../membership/entities/membership.entity';

export class ResponseUserDto {
  
    @IsNumber()
    @IsNotEmpty()
    id: Number

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    @IsString()
    photo?: string | null = null;
     
    @IsOptional()
    @Type(() => Membership)
    membership: Membership | null = null;

    @IsNotEmpty()
    cars: Car[];

    @IsNotEmpty()
    loyaltyRewards: Loyalty_Reward[];

    @IsNotEmpty()
    history: History[];
}
