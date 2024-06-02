import { User } from "../../user/entities/user.entity";
import { ResponseLocationDto } from "../../location/dto/response-location.dto";
import { IsDate, IsNumber } from "class-validator";
import { Location } from "../../location/entities/location.entity";

export class AddHistoryDto {
    constructor(history) {
        this.user = history.user
        this.date = history.date;
        this.location = history.location
    }

    user: User;

    @IsDate()
    date: Date;

    location: Location
}