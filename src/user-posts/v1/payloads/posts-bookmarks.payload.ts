import { Field, ObjectType } from '@nestjs/graphql';
import { PageOffsetInfo } from 'src/common/models';
import { UserError } from 'src/common/types';
import { PostModel } from 'src/posts/v1/models';

@ObjectType()
export class PostsBookmarksPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => [PostModel], { nullable: true })
  data?: PostModel[];

  @Field(() => PageOffsetInfo, { nullable: true })
  pageInfo?: PageOffsetInfo;

  static create(props: Partial<PostsBookmarksPayload>): PostsBookmarksPayload {
    const payload = new PostsBookmarksPayload();
    Object.assign(payload, props);

    return payload;
  }
}
