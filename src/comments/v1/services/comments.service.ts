import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CommentMedia } from 'src/comment-media/entities';
import { CommentMediaRepository } from 'src/comment-media/repositories';
import { Comment } from 'src/comments/entities';
import { CommentsRepository } from 'src/comments/repositories';
import { PageOffsetInfo } from 'src/common/models';
import { User } from 'src/users/entities';
import { CommentAddToPostInput, CommentPostEditInput, CommentsPostGetInput } from '../inputs';
import { CommentModel } from '../models';

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

  async remove(commentId: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(commentId);

    return this.commentsRepository.remove(comment);
  }

  async getComments(input: CommentsPostGetInput): Promise<{
    data: CommentModel[];
    pageInfo: PageOffsetInfo;
  }> {
    const { comments, ...pageInfo } = await this.commentsRepository.getCommentsPagination(input);

    const data = comments.map((comment) => CommentModel.create(comment));

    return {
      data,
      pageInfo,
    };
  }
}
