import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ImageCompressionService } from '../image-compression/image-compression.service';

require('dotenv').config();

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ImageCompressionService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [
    TypeOrmModule.forFeature([User]),
    UserService,
    ImageCompressionService,
  ],
})
export class UserModule {}
