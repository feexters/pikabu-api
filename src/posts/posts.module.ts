import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaRepository } from 'src/post-media/repositories';
import { PostsRepository } from './repositories';
import { PostResolver, PostsMutationResolver, PostsQueryResolver } from './v1/resolvers';
import { PostsService } from './v1/services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, PostMediaRepository])],
  providers: [PostsMutationResolver, PostsQueryResolver, PostResolver, PostsService],
})
export class PostsModule {}
