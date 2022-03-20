import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PostMediaRepository])],
})
export class PostMediaModule {}
