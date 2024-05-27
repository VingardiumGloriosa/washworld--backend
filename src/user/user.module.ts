import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@src/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

require('dotenv').config();

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([User]), 
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    })
  ],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserModule {}
