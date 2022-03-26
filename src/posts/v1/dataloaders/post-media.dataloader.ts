import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'src/common/libs/dataloader';
import { PostMedia } from 'src/post-media/entities';
import { PostMediaRepository } from 'src/post-media/repositories';

@Injectable()
export class PostMediaLoader implements NestDataLoader<string, PostMedia[] | undefined> {
  constructor(private postMediaRepository: PostMediaRepository) {}

  generateDataLoader(): DataLoader<string, PostMedia[] | undefined> {
    return new DataLoader<string, PostMedia[] | undefined>((postIds) =>
      this.postMediaRepository.getPostMediaLoader(postIds),
    );
  }
}
