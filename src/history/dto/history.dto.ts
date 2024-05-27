import { ResponseLocationDto } from "../../location/dto/response-location.dto";
import { IsDate, IsNumber } from "class-validator";

export class HistoryDto {
    constructor(history) {
        this.id = history.id;
        this.date = history.date;
        this.location = new ResponseLocationDto(history.location)
    }

    @IsNumber()
    id: number;

    @IsDate()
    date: Date;

    location: ResponseLocationDto
}