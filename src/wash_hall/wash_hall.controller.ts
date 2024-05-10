import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WashHallService } from './wash_hall.service';
import { CreateWashHallDto } from './dto/create-wash_hall.dto';
import { UpdateWashHallDto } from './dto/update-wash_hall.dto';

@Controller('wash-hall')
export class WashHallController {
  constructor(private readonly washHallService: WashHallService) {}

  @Post()
  create(@Body() createWashHallDto: CreateWashHallDto) {
    return this.washHallService.create(createWashHallDto);
  }

  @Get()
  findAll() {
    return this.washHallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.washHallService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWashHallDto: UpdateWashHallDto) {
    return this.washHallService.update(+id, updateWashHallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.washHallService.remove(+id);
  }
}
