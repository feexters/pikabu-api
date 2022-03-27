import { CommentAddBookmarkInput } from './../inputs/comment-add-bookmark.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IAM } from 'src/common/decorators';
import { UserCommentsService } from '../services';

@Resolver()
export class UserCommentsMutationResolver {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  // @Mutation(() => Boolean)
  // async postAddLike(
  //   @IAM('id') userId,
  //   @Args({ name: 'input', type: () => PostAddLikeInput }) input: PostAddLikeInput,
  // ): Promise<boolean> {
  //   await this.userPostsService.postAddLike(userId, input);

  //   return true;
  // }

  @Mutation(() => Boolean)
  async commentAddBookmark(
    @IAM('id') userId,
    @Args({ name: 'input', type: () => CommentAddBookmarkInput }) input: CommentAddBookmarkInput,
  ): Promise<boolean> {
    await this.userCommentsService.commentAddBookmark(userId, input);

    return true;
  }
}
