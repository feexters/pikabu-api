import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { PostAddBookmarkInput, PostAddLikeInput } from '../inputs';
import { UserPostsService } from '../services';

@Resolver()
export class UserPostsMutationResolver {
  constructor(private readonly userPostsService: UserPostsService) {}

  @Mutation(() => Boolean)
  async postAddLike(
    @IAM('id') userId,
    @Args({ name: 'input', type: () => PostAddLikeInput }) input: PostAddLikeInput,
  ): Promise<boolean> {
    await this.userPostsService.postAddLike(userId, input);

    return true;
  }

  @Mutation(() => Boolean)
  async postAddBookmark(
    @IAM('id') userId,
    @Args({ name: 'input', type: () => PostAddBookmarkInput }) input: PostAddBookmarkInput,
  ): Promise<boolean> {
    await this.userPostsService.postAddBookmark(userId, input);

    return true;
  }
}
