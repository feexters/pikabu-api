import { Field, ObjectType } from '@nestjs/graphql';
import { CommentMediaModel } from 'src/comment-media/v1/models';
import { Comment } from 'src/comments/entities';
import { UUID } from 'src/common/scalars';

@ObjectType()
export class CommentModel {
  @Field(() => UUID)
  id: string;

  @Field(() => String)
  comment: string;

  @Field(() => UUID)
  postId: string;

  @Field(() => UUID)
  userId: string;

  @Field(() => [CommentMediaModel], { nullable: true })
  media?: CommentMediaModel[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  private constructor(data: Partial<CommentModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Comment>): CommentModel {
    return new CommentModel({
      ...props,
      media: props.media ? props.media.map(CommentMediaModel.create) : undefined,
    });
  }
}
