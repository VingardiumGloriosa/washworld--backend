import { PartialType } from '@nestjs/mapped-types';
import { CreateWashHallDto } from './create-wash_hall.dto';

export class UpdateWashHallDto extends PartialType(CreateWashHallDto) {}
