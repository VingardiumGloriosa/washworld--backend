import { Injectable } from '@nestjs/common';
import { CreateWashHallDto } from './dto/create-wash_hall.dto';
import { UpdateWashHallDto } from './dto/update-wash_hall.dto';

@Injectable()
export class WashHallService {
  create(createWashHallDto: CreateWashHallDto) {
    return 'This action adds a new washHall';
  }

  findAll() {
    return `This action returns all washHall`;
  }

  findOne(id: number) {
    return `This action returns a #${id} washHall`;
  }

  update(id: number, updateWashHallDto: UpdateWashHallDto) {
    return `This action updates a #${id} washHall`;
  }

  remove(id: number) {
    return `This action removes a #${id} washHall`;
  }
}
