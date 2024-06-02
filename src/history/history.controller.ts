import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UserId } from '../jwt/user-id.decorator';

@Controller('users/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@UserId() userId: number, @Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(userId, createHistoryDto);
  }
}
