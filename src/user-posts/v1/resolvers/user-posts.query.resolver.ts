import { Args, Query, Resolver } from '@nestjs/graphql';
import { validate } from 'src/common/utils';
import { PostsBookmarksInput } from '../inputs';
import { UserPostsService } from '../services';
import { PostsBookmarksPayload } from '../payloads/posts-bookmarks.payload';
import { IAM } from 'src/common/decorators';

@Resolver()
export class UserPostsQueryResolver {
  constructor(private readonly userPostsService: UserPostsService) {}

  @Query(() => PostsBookmarksPayload)
  async postsBookmarks(
    @IAM('id') userId: string,
    @Args({ name: 'input', type: () => PostsBookmarksInput }) input: PostsBookmarksInput,
  ): Promise<PostsBookmarksPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const result = await this.userPostsService.getPostsBookmarks(userId, input);

    return PostsBookmarksPayload.create(result);
  }
}
