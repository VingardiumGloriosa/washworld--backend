// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service'; // Adjust the path if necessary
import { UserModule } from '../user/user.module'; // Adjust the path if necessary
import { JwtStrategy } from './jwt.strategy';
import { MatchUserIdGuard } from './jwt-auth.guard';

require('dotenv').config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtStrategy, MatchUserIdGuard, UserService],
  exports: [UserService],
})
export class AuthModule {}