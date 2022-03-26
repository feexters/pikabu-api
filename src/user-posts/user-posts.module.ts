import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/repositories';
import { UserPostsLikeRepository } from './repositories';
import { UserPostsMutationResolver } from './v1/resolvers/user-posts.mutation.resolver';
import { UserPostsService } from './v1/services/user-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, UserPostsLikeRepository])],
  providers: [UserPostsService, UserPostsMutationResolver],
})
export class UserPostsModule {}
