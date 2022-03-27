import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators';
import { validate } from 'src/common/utils';
import { CommentsPostGetInput } from '../inputs';
import { CommentsPostGetPayload } from '../payloads';
import { CommentsService } from '../services';

@Resolver()
export class CommentsQueryResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => CommentsPostGetPayload)
  @Public()
  async commentsPostGet(
    @Args({ name: 'input', type: () => CommentsPostGetInput }) input: CommentsPostGetInput,
  ): Promise<CommentsPostGetPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    const result = await this.commentsService.getComments(input);

    return CommentsPostGetPayload.create(result);
  }
}
