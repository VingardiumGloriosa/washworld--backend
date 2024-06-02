import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

export const UserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    const decoded = jwtService.decode(token) as { id: number };

    if (!decoded.id) {
      throw new UnauthorizedException('No token found');
    }

    return decoded.id;
  },
);
