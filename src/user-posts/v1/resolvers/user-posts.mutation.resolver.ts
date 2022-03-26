import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { PostAddLikeInput } from '../inputs';
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
}
