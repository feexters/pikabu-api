import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommentMedia } from 'src/comment-media/entities';
import { CommentMediaRepository } from 'src/comment-media/repositories';
import { Comment } from 'src/comments/entities';
import { CommentsRepository } from 'src/comments/repositories';
import { User } from 'src/users/entities';
import { CommentAddToPostInput, CommentPostEditInput } from '../inputs';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly commentsMediaRepository: CommentMediaRepository,
  ) {}

  createCommentMedia = (commentId: string, mediaInput?: CommentAddToPostInput['media']): CommentMedia[] => {
    if (!mediaInput) {
      return [];
    }

    const createdMedia = mediaInput.map((media) => this.commentsMediaRepository.create({ ...media, commentId }));

    return createdMedia;
  };

  async createComment(userId: User['id'], input: CommentAddToPostInput): Promise<Comment> {
    const createdComment = this.commentsRepository.create({ ...input, userId });
    const savedComment = await this.commentsRepository.save(createdComment);

    const createdCommentMedia = this.createCommentMedia(savedComment.id, input.media);

    const savedMedia = await this.commentsMediaRepository.save(createdCommentMedia);

    return { ...savedComment, media: savedMedia };
  }

  async editComment({ id, ...updatedValues }: CommentPostEditInput): Promise<Comment> {
    const existComment = await this.commentsRepository.findOne(id);

    if (!existComment) {
      throw new InternalServerErrorException('Comment does not exist');
    }

    return this.commentsRepository.save({ ...existComment, ...updatedValues });
  }
}
