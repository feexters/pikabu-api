import { Injectable } from '@nestjs/common';
import { CommentModel } from 'src/comments/v1/models';
import { PageOffsetInfo } from 'src/common/models';
import { UserCommentsBookmarksRepository } from 'src/user-comments/repositories/user-comments-bookmark.repository';
import { CommentAddBookmarkInput, CommentsBookmarksInput } from '../inputs';

@Injectable()
export class UserCommentsService {
  constructor(private readonly userCommentsBookmarksRepository: UserCommentsBookmarksRepository) {}

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
