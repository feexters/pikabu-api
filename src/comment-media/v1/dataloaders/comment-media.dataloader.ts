import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { CommentMedia } from 'src/comment-media/entities';
import { CommentMediaRepository } from 'src/comment-media/repositories';
import { NestDataLoader } from 'src/common/libs/dataloader';

@Injectable()
export class CommentMediaLoader implements NestDataLoader<string, CommentMedia[] | undefined> {
  constructor(private commentMediaRepository: CommentMediaRepository) {}

  generateDataLoader(): DataLoader<string, CommentMedia[] | undefined> {
    return new DataLoader<string, CommentMedia[] | undefined>((commentIds) =>
      this.commentMediaRepository.getCommentMediaLoader(commentIds),
    );
  }
}
