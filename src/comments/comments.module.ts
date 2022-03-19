import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
})
export class CommentsModule {}
