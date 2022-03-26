import { Injectable } from '@nestjs/common';
import { PageOffsetInfo } from 'src/common/models';
import { PostsRepository } from 'src/posts/repositories';
import { PostModel } from 'src/posts/v1/models';
import { UserPostsBookmarksRepository } from 'src/user-posts/repositories';
import { UserPostsLikeRepository } from '../../repositories/user-posts-like.repository';
import { PostAddLikeInput, PostsBookmarksInput } from '../inputs';
import { PostAddBookmarkInput } from '../inputs/post-add-bookmark.input';

@Injectable()
export class UserPostsService {
  constructor(
    private readonly usersPostsLikeRepository: UserPostsLikeRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersPostsBookmarksRepository: UserPostsBookmarksRepository,
  ) {}

  async postAddLike(userId: string, { postId, type }: PostAddLikeInput): Promise<boolean> {
    const existRelation = await this.usersPostsLikeRepository.findOne({ userId, postId });

    if (!existRelation) {
      const created = this.usersPostsLikeRepository.create({ userId, postId, type });

      await this.usersPostsLikeRepository.save(created);

      return this.postsRepository.updateLikeCounters({ postId, increment: type });
    }

    if (existRelation.type === type) {
      await this.usersPostsLikeRepository.remove(existRelation);

      return this.postsRepository.updateLikeCounters({ postId, decrement: type });
    }

    const newRelation = await this.usersPostsLikeRepository.save({ ...existRelation, type });

    return this.postsRepository.updateLikeCounters({
      postId,
      decrement: existRelation.type,
      increment: newRelation.type,
    });
  }

  async getPostsBookmarks(
    userId: string,
    input: PostsBookmarksInput,
  ): Promise<{
    data: PostModel[];
    pageInfo: PageOffsetInfo;
  }> {
    const { posts, ...pageInfo } = await this.usersPostsBookmarksRepository.getPostsPagination(userId, input);

    const data = posts.map((post) => PostModel.create(post));

    return {
      data,
      pageInfo,
    };
  }

  async postAddBookmark(userId: string, { postId }: PostAddBookmarkInput): Promise<boolean> {
    const exist = await this.usersPostsBookmarksRepository.findOne({ userId, postId });

    if (exist) {
      await this.usersPostsBookmarksRepository.remove(exist);

      return true;
    }

    const created = this.usersPostsBookmarksRepository.create({ userId, postId });
    await this.usersPostsBookmarksRepository.save(created);

    return true;
  }
}
