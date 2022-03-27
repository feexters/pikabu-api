import { Args, Query, Resolver } from '@nestjs/graphql';
import { validate } from 'src/common/utils';
import { IAM } from 'src/common/decorators';
import { CommentsBookmarksPayload } from '../payloads';
import { UserCommentsService } from '../services';
import { CommentsBookmarksInput } from '../inputs';

@Resolver()
export class UserPostsQueryResolver {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Query(() => CommentsBookmarksPayload)
  async commentsBookmarks(
    @IAM('id') userId: string,
    @Args({ name: 'input', type: () => CommentsBookmarksInput }) input: CommentsBookmarksInput,
  ): Promise<CommentsBookmarksPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const result = await this.userCommentsService.getCommentsBookmarks(userId, input);

    return CommentsBookmarksPayload.create(result);
  }
}
