import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostsGetInput } from '../inputs';
import { PostsGetPayload } from '../payloads/posts-get.payload';
import { PostsService } from '../services';
import { validate } from 'src/common/utils';
import { Public } from 'src/common/decorators/public.decorator';

@Resolver()
export class PostsQueryResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostsGetPayload)
  @Public()
  async postsGet(@Args({ name: 'input', type: () => PostsGetInput }) input: PostsGetInput): Promise<PostsGetPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const result = await this.postsService.getPosts(input);

    return PostsGetPayload.create(result);
  }
}
