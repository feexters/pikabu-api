import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { validate } from 'src/common/utils';
import { User } from 'src/users/entities';
import { PostCreateInput } from '../inputs/post-create.input';
import { PostCreatePayload } from '../payloads';
import { PostsService } from '../services';

@Resolver()
export class PostsMutationResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostCreatePayload)
  async createPost(
    @IAM() user: User,
    @Args({ name: 'input', type: () => PostCreateInput }) input: PostCreateInput,
  ): Promise<PostCreatePayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const post = await this.postsService.createPost(user.id, input);

    return PostCreatePayload.create({ post });
  }
}
