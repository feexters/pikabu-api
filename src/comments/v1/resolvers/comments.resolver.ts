import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { CommentMedia } from 'src/comment-media/entities';
import { CommentMediaLoader } from 'src/comment-media/v1/dataloaders';
import { CommentMediaModel } from 'src/comment-media/v1/models';
import { Comment } from 'src/comments/entities';
import { Loader } from 'src/common/libs/dataloader';
import { CommentModel } from '../models';

@Resolver(() => CommentModel)
export class CommentsResolver {
  @ResolveField()
  async media(
    @Parent() commentModel: CommentModel,
    @Loader(CommentMediaLoader) commentMediaLoader: DataLoader<Comment['id'], CommentMedia[]>,
  ): Promise<CommentMediaModel[]> {
    const { id: commentId } = commentModel;

    const commentMedia = await commentMediaLoader.load(commentId);

    return commentMedia.map((media) => CommentMediaModel.create(media));
  }
}
