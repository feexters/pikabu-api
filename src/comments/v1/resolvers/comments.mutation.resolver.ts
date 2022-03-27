import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { validate } from 'src/common/utils';
import { User } from 'src/users/entities';
import { CommentAddToPostInput } from '../inputs';
import { CommentAddToPostPayload } from '../payloads';
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
}
