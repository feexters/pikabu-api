import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository])],
})
export class PostsModule {}
