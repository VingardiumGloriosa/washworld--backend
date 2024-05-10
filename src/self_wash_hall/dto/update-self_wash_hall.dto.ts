import { PartialType } from '@nestjs/mapped-types';
import { CreateSelfWashHallDto } from './create-self_wash_hall.dto';

export class UpdateSelfWashHallDto extends PartialType(CreateSelfWashHallDto) {}
