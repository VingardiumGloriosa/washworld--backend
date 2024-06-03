import { IsNumber } from 'class-validator';
import { Membership_Type } from 'src/membership_type/entities/membership_type.entity';
import { Membership } from '../entities/membership.entity';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';

export class ResponseMembershipDto {

    constructor(m : Membership) {
        this.membershipType = m.membershipType
        this.id = m.id;
        this.startDate = m.start_date;
        this.endDate = m.end_date;
        this.status = m.status;
        this.user = new ResponseUserDto(m.user)
    }
    
    id: number;
    membershipType: Membership_Type;
    startDate: Date
    endDate: Date
    status: string
    user: ResponseUserDto
}
