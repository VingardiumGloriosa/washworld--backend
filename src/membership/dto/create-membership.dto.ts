import { IsNumber } from 'class-validator';

export class CreateMembershipDto {
  @IsNumber()
  membershipTypeId: number;
}
