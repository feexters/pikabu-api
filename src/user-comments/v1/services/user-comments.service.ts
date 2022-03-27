import { Injectable } from '@nestjs/common';
import { CommentModel } from 'src/comments/v1/models';
import { PageOffsetInfo } from 'src/common/models';
import { UserCommentsLikeRepository } from 'src/user-comments/repositories';
import { UserCommentsBookmarksRepository } from 'src/user-comments/repositories/user-comments-bookmark.repository';
import { CommentAddBookmarkInput, CommentAddLikeInput, CommentsBookmarksInput } from '../inputs';
import { CommentsRepository } from '../../../comments/repositories/comment.repository';

@Injectable()
export class UserCommentsService {
  constructor(
    private readonly userCommentsBookmarksRepository: UserCommentsBookmarksRepository,
    private readonly userCommentsLikeRepository: UserCommentsLikeRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async commentAddLike(userId: string, { commentId, type }: CommentAddLikeInput): Promise<boolean> {
    const existRelation = await this.userCommentsLikeRepository.findOne({ userId, commentId });

    if (!existRelation) {
      const created = this.userCommentsLikeRepository.create({ userId, commentId, type });

      await this.userCommentsLikeRepository.save(created);

      return this.commentsRepository.updateLikeCounters({ commentId, increment: type });
    }

    if (existRelation.type === type) {
      await this.userCommentsLikeRepository.remove(existRelation);

      return this.commentsRepository.updateLikeCounters({ commentId, decrement: type });
    }

    const newRelation = await this.userCommentsLikeRepository.save({ ...existRelation, type });

    return this.commentsRepository.updateLikeCounters({
      commentId,
      decrement: existRelation.type,
      increment: newRelation.type,
    });
  }

  async getCommentsBookmarks(
    userId: string,
    input: CommentsBookmarksInput,
  ): Promise<{
    data: CommentModel[];
    pageInfo: PageOffsetInfo;
  }> {
    const { comments, ...pageInfo } = await this.userCommentsBookmarksRepository.getCommentsPagination(userId, input);

    const data = comments.map((comment) => CommentModel.create(comment));

    return {
      data,
      pageInfo,
    };
  }

  async commentAddBookmark(userId: string, { commentId }: CommentAddBookmarkInput): Promise<boolean> {
    const exist = await this.userCommentsBookmarksRepository.findOne({ userId, commentId });

    if (exist) {
      await this.userCommentsBookmarksRepository.remove(exist);

      return true;
    }

    const created = this.userCommentsBookmarksRepository.create({ userId, commentId });
    await this.userCommentsBookmarksRepository.save(created);

    return true;
  }
}
