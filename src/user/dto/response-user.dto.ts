import { Type } from 'class-transformer';
import { IsEmail, IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Car } from '../../car/entities/car.entity';
import { History } from '../../history/entities/history.entity';
import { Loyalty_Reward } from '../../loyalty_reward/entities/loyalty_reward.entity';
import { Membership } from '../../membership/entities/membership.entity';
import { HistoryDto } from '../../history/dto/history.dto';
import { User } from '../entities/user.entity';
import { ResponseLoyaltyRewardDto } from '../../loyalty_reward/dto/response-loyalty_reward.dto';

export class ResponseUserDto {

    constructor (user : User) {
        if (!user) {
          throw new Error(`User not found`);
        }
    
        this.id = user.id
        this.email = user.email
        this.fullName = user.fullName
        this.membership = user.membership
        this.cars = user.cars
        this.loyaltyRewards = user.loyaltyRewards.map(lr => new ResponseLoyaltyRewardDto(lr))
        this.history = user.history.map(history => new HistoryDto(history))
    
        if (user.photo) {
          const photoBase64 = user.photo.toString('base64');
          this.photo = `data:image/jpeg;base64,${photoBase64}`;
        }
      }
  
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
    loyaltyRewards: ResponseLoyaltyRewardDto[];

    @IsNotEmpty()
    history: HistoryDto[];
}
