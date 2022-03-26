import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/common/types';

import { Post } from '../../entities';
import { PostModel } from '../models/post.model';

@ObjectType()
export class PostCreatePayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => PostModel, { nullable: true })
  post?: PostModel;

  static create(props: Partial<Omit<PostCreatePayload, 'post'> & { post?: Post }>): PostCreatePayload {
    const payload = new PostCreatePayload();

    Object.assign(payload, {
      ...props,
      post: props.post ? PostModel.create(props.post) : undefined,
    });

    return payload;
  }
}
