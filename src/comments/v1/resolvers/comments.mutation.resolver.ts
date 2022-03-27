import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { validate } from 'src/common/utils';
import { User } from 'src/users/entities';
import { CommentOwnerGuard } from '../guards/comment-owner.guard';
import { CommentAddToPostInput, CommentPostEditInput } from '../inputs';
import { CommentAddToPostPayload, CommentPostEditPayload } from '../payloads';
import { CommentsService } from '../services';

@Resolver()
export class CommentsMutationResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => CommentAddToPostPayload)
  async commentAddToPost(
    @IAM() user: User,
    @Args({ name: 'input', type: () => CommentAddToPostInput }) input: CommentAddToPostInput,
  ): Promise<CommentAddToPostPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const comment = await this.commentsService.createComment(user.id, input);

    return CommentAddToPostPayload.create({ comment });
  }

  @Mutation(() => CommentPostEditPayload)
  @UseGuards(CommentOwnerGuard)
  async commentPostEdit(
    @Args({ name: 'input', type: () => CommentPostEditInput }) input: CommentPostEditInput,
  ): Promise<CommentPostEditPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const comment = await this.commentsService.editComment(input);

    return CommentPostEditPayload.create({ comment });
  }
}
