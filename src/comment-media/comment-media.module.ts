import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from 'src/comments/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository])],
})
export class CommentMediaModule {}
