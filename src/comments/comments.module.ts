import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './repositories';
import { CommentsService } from './v1/services/comments.service';
import { CommentsMutationResolver, CommentsQueryResolver, CommentsResolver } from './v1/resolvers';
import { CommentMediaRepository } from '../comment-media/repositories/comment-media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsRepository, CommentMediaRepository])],
  providers: [CommentsService, CommentsMutationResolver, CommentsQueryResolver, CommentsResolver],
})
export class CommentsModule {}
