import { Injectable } from '@nestjs/common';
import { CreateSelfWashHallDto } from './dto/create-self_wash_hall.dto';
import { UpdateSelfWashHallDto } from './dto/update-self_wash_hall.dto';

@Injectable()
export class SelfWashHallService {
  create(createSelfWashHallDto: CreateSelfWashHallDto) {
    return 'This action adds a new selfWashHall';
  }

  findAll() {
    return `This action returns all selfWashHall`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selfWashHall`;
  }

  update(id: number, updateSelfWashHallDto: UpdateSelfWashHallDto) {
    return `This action updates a #${id} selfWashHall`;
  }

  remove(id: number) {
    return `This action removes a #${id} selfWashHall`;
  }
}
