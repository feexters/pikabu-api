import { Field, ObjectType } from '@nestjs/graphql';
import { PageOffsetInfo } from 'src/common/models';
import { UserError } from 'src/common/types';

import { PostModel } from '../models/post.model';

@ObjectType()
export class PostsGetPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => [PostModel], { nullable: true })
  data?: PostModel[];

  @Field(() => PageOffsetInfo, { nullable: true })
  pageInfo?: PageOffsetInfo;

  static create(props: Partial<PostsGetPayload>): PostsGetPayload {
    const payload = new PostsGetPayload();
    Object.assign(payload, props);

    return payload;
  }
}
