import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from 'src/comments/repositories';
import { UserCommentsBookmarksRepository } from './repositories/user-comments-bookmark.repository';
import { UserCommentsService } from './v1/services';
import { UserCommentsMutationResolver, UserPostsQueryResolver } from './v1/resolvers';
import { UserCommentsLikeRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository, UserCommentsBookmarksRepository, UserCommentsLikeRepository]),
  ],
  providers: [UserCommentsService, UserCommentsMutationResolver, UserPostsQueryResolver],
})
export class UserCommentsModule {}
