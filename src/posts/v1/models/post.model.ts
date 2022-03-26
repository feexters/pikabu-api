import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'src/common/scalars';
import { PostMediaModel } from 'src/post-media/v1/models';
import { Post } from 'src/posts/entities';

@ObjectType()
export class PostModel {
  @Field(() => UUID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [PostMediaModel], { nullable: true })
  media?: PostMediaModel[];

  @Field(() => Number)
  likesCount?: number;

  @Field(() => Number)
  dislikesCount?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  private constructor(data: Partial<PostModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<Post>): PostModel {
    return new PostModel({
      ...props,
      media: props.media ? props.media.map(PostMediaModel.create) : undefined,
    });
  }
}
