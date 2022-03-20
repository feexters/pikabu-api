import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories';
import { UsersMutationResolver } from './v1/resolvers';
import { UserAuthService } from './v1/services';
import { JWTConfigService } from 'src/auth/v1/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  providers: [UsersMutationResolver, UserAuthService],
})
export class UsersModule {}
