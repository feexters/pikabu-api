import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories';
import { JwtStrategy } from './jwt.strategy';
import { AuthJwtService, JWTConfigService } from './v1/services';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  providers: [JwtStrategy, AuthJwtService],
  exports: [PassportModule, JwtStrategy, JwtModule],
})
export class AuthModule {}
