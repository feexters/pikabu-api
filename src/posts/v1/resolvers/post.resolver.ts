import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostMedia } from 'src/post-media/entities';
import { PostMediaModel } from 'src/post-media/v1/models';
import { Post } from 'src/posts/entities';
import { PostModel } from '../models';
import * as DataLoader from 'dataloader';
import { PostMediaLoader } from '../dataloaders';
import { Loader } from 'src/common/libs/dataloader';

@Resolver(() => PostModel)
export class PostResolver {
  @ResolveField()
  async media(
    @Parent() postModel: PostModel,
    @Loader(PostMediaLoader) postMediaLoader: DataLoader<Post['id'], PostMedia[]>,
  ): Promise<PostMediaModel[]> {
    const { id: postId } = postModel;

    const postMedia = await postMediaLoader.load(postId);

    return postMedia.map((media) => PostMediaModel.create(media));
  }
}
