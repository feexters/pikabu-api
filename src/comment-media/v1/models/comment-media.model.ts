import { Field, ObjectType } from '@nestjs/graphql';
import { CommentMedia } from 'src/comment-media/entities';
import { MediaBaseModel } from 'src/common/models';
import { UUID } from 'src/common/scalars';

@ObjectType()
export class CommentMediaModel extends MediaBaseModel {
  @Field(() => UUID)
  id: string;

  @Field(() => UUID)
  commentId: string;

  private constructor(data: CommentMediaModel) {
    super();
    Object.assign(this, data);
  }

  static create(props: CommentMedia): CommentMediaModel {
    return new CommentMediaModel({
      ...props,
    });
  }
}
