import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Car } from 'src/car/entities/car.entity';
import { History } from 'src/history/entities/history.entity';
import { Loyalty_Reward } from 'src/loyalty_reward/entities/loyalty_reward.entity';
import { Membership } from 'src/membership/entities/membership.entity';

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

    @IsString()
    photo?: string | null;
     
    @IsNotEmpty()
    @Type(() => Membership)
    membership: Membership;

    @IsNotEmpty()
    cars: Car[];

    @IsNotEmpty()
    loyaltyRewards: Loyalty_Reward[];

    @IsNotEmpty()
    history: History[];
}
