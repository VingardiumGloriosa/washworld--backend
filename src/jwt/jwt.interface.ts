import { IsEmail } from "class-validator";

export interface JwtPayload {
    email: string;
    id: number;
}
  