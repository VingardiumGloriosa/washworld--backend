import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([History])],
  exports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
