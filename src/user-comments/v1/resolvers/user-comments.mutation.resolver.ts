import { CommentAddBookmarkInput } from './../inputs/comment-add-bookmark.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { UserCommentsService } from '../services';
import { CommentAddLikeInput } from '../inputs';

@Resolver()
export class UserCommentsMutationResolver {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Mutation(() => Boolean)
  async commentAddLike(
    @IAM('id') userId,
    @Args({ name: 'input', type: () => CommentAddLikeInput }) input: CommentAddLikeInput,
  ): Promise<boolean> {
    await this.userCommentsService.commentAddLike(userId, input);

    return true;
  }

  @Mutation(() => Boolean)
  async commentAddBookmark(
    @IAM('id') userId,
    @Args({ name: 'input', type: () => CommentAddBookmarkInput }) input: CommentAddBookmarkInput,
  ): Promise<boolean> {
    await this.userCommentsService.commentAddBookmark(userId, input);

    return true;
  }
}
