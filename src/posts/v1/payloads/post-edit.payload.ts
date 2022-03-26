import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/common/types';

import { Post } from '../../entities';
import { PostModel } from '../models/post.model';

@ObjectType()
export class PostEditPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => PostModel, { nullable: true })
  post?: PostModel;

  static create(props: Partial<Omit<PostEditPayload, 'post'> & { post?: Post }>): PostEditPayload {
    const payload = new PostEditPayload();

    Object.assign(payload, {
      ...props,
      post: props.post ? PostModel.create(props.post) : undefined,
    });

    return payload;
  }
}
