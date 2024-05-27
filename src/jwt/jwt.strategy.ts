import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.interface';

require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new Error('unauthorized');
    }
    return user;
  }
}
