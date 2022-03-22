import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaRepository } from 'src/post-media/repositories';
import { PostsRepository } from './repositories';
import { PostsMutationResolver, PostsQueryResolver } from './v1/resolvers';
import { PostsService } from './v1/services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, PostMediaRepository])],
  providers: [PostsMutationResolver, PostsQueryResolver, PostsService],
})
export class PostsModule {}
