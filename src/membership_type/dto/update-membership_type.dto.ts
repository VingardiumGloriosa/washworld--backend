import { PartialType } from '@nestjs/mapped-types';
import { CreateMembershipTypeDto } from './create-membership_type.dto';

export class UpdateMembershipTypeDto extends PartialType(CreateMembershipTypeDto) {}
