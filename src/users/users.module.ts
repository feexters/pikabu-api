import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
})
export class UsersModule {}
