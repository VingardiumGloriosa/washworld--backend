import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { User } from '../user/entities/user.entity';
import { HistoryDto } from './dto/history.dto';
import { AddHistoryDto } from './dto/add-history.dto';
import { LOYALTY_REWARD_GOAL } from '../user/user.controller';
import { Loyalty_Reward } from '../loyalty_reward/entities/loyalty_reward.entity';
import { LoyaltyRewardService } from '../loyalty_reward/loyalty_reward.service';
import { CreateLoyaltyRewardDto } from '../loyalty_reward/dto/create-loyalty_reward.dto';
import { Location } from '../location/entities/location.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    private loyaltyRewardService: LoyaltyRewardService,
  ) {}

  async addHistoryEntry(historyEntry: Partial<History>): Promise<History> {
    const entry = this.historyRepository.create(historyEntry);
    return this.historyRepository.save(entry);
  }

  async findHistoryByUser(userId: number): Promise<History[]> {
    return this.historyRepository.find({
      where: { user: { id: userId } },
      relations: ['location'],
    });
  }

  async create(
    userId: number,
    createHistoryDto: CreateHistoryDto,
  ): Promise<History> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const location = await this.locationRepository.findOneById(
      createHistoryDto.locationId,
    );
    if (!location) throw new NotFoundException('Location not found');

    const historyPayload = new AddHistoryDto({
      date: createHistoryDto.date ? createHistoryDto.date : new Date(),
      user,
      location,
    });

    const history = await this.historyRepository.create(historyPayload);
    if (!history) throw new ConflictException('Failed to create history');

    const savedHistory = await this.historyRepository.save(history);
    if (!savedHistory) throw new ConflictException('Failed to save history');

    const allUserHistory = await this.historyRepository.find({
      where: { user },
    });
    if (!allUserHistory)
      throw new ConflictException('Failed to fetch all user history');

    // Adding loyalty rewards for user
    if (allUserHistory.length % LOYALTY_REWARD_GOAL === 0) {
      const newLoyaltyReward = await this.loyaltyRewardService.create(
        new CreateLoyaltyRewardDto({ userId }),
      );

      console.log(
        'Generated a new loyalty reward for the user!',
        newLoyaltyReward,
      );
    }

    return savedHistory;
  }
}
