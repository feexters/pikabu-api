import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { UUID } from 'src/common/scalars';
import { validate } from 'src/common/utils';
import { User } from 'src/users/entities';
import { PostOwnerGuard } from '../guards';
import { PostCreateInput } from '../inputs/post-create.input';
import { PostEditInput } from '../inputs/post-edit.input';
import { PostCreatePayload, PostEditPayload } from '../payloads';
import { PostsService } from '../services';

@Resolver()
export class PostsMutationResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostCreatePayload)
  async postCreate(
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

  @Mutation(() => PostEditPayload)
  @UseGuards(PostOwnerGuard)
  async postEdit(@Args({ name: 'input', type: () => PostEditInput }) input: PostEditInput): Promise<PostEditPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const post = await this.postsService.editPost(input);

    return PostEditPayload.create({ post });
  }

  @Mutation(() => Boolean)
  @UseGuards(PostOwnerGuard)
  async postRemove(@Args('postId', { type: () => UUID }) postId: string): Promise<boolean> {
    await this.postsService.remove(postId);

    return true;
  }
}
