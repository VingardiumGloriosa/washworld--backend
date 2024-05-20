import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async addHistoryEntry(historyEntry: Partial<History>): Promise<History> {
    const entry = this.historyRepository.create(historyEntry);
    return this.historyRepository.save(entry);
  }

  async findHistoryByUser(userId: number): Promise<History[]> {
    return this.historyRepository.find({ where: { user: { id: userId } }, relations: ['location'] });
  }
}
