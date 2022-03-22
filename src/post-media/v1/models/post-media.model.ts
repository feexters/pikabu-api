import { Field, ObjectType } from '@nestjs/graphql';
import { MediaBaseModel } from 'src/common/models';
import { UUID } from 'src/common/scalars';
import { PostMedia } from 'src/post-media/entities';

@ObjectType()
export class PostMediaModel extends MediaBaseModel {
  @Field(() => UUID)
  id: string;

  @Field(() => UUID)
  postId: string;

  private constructor(data: PostMediaModel) {
    super();
    Object.assign(this, data);
  }

  static create(props: PostMedia): PostMediaModel {
    return new PostMediaModel({
      ...props,
    });
  }
}
