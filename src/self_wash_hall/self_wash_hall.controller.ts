import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SelfWashHallService } from './self_wash_hall.service';
import { CreateSelfWashHallDto } from './dto/create-self_wash_hall.dto';
import { UpdateSelfWashHallDto } from './dto/update-self_wash_hall.dto';

@Controller('self-wash-halls')
export class SelfWashHallController {
  constructor(private readonly selfWashHallService: SelfWashHallService) {}

  @Post()
  create(@Body() createSelfWashHallDto: CreateSelfWashHallDto) {
    return this.selfWashHallService.create(createSelfWashHallDto);
  }

  @Get()
  findAll() {
    return this.selfWashHallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.selfWashHallService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSelfWashHallDto: UpdateSelfWashHallDto,
  ) {
    return this.selfWashHallService.update(+id, updateSelfWashHallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.selfWashHallService.remove(+id);
  }
}
