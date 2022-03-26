import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/repositories';
import { UserPostsLikeRepository } from './repositories';
import { UserPostsMutationResolver } from './v1/resolvers/user-posts.mutation.resolver';
import { UserPostsService } from './v1/services/user-posts.service';
import { UserPostsQueryResolver } from './v1/resolvers/user-posts.query.resolver';
import { UserPostsBookmarksRepository } from './repositories/user-posts-bookmarks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, UserPostsLikeRepository, UserPostsBookmarksRepository])],
  providers: [UserPostsService, UserPostsMutationResolver, UserPostsQueryResolver],
})
export class UserPostsModule {}
