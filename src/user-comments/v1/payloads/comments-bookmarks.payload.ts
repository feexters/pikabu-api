import { Field, ObjectType } from '@nestjs/graphql';
import { PageOffsetInfo } from 'src/common/models';
import { UserError } from 'src/common/types';
import { CommentModel } from 'src/comments/v1/models';

@ObjectType()
export class CommentsBookmarksPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => [CommentModel], { nullable: true })
  data?: CommentModel[];

  @Field(() => PageOffsetInfo, { nullable: true })
  pageInfo?: PageOffsetInfo;

  static create(props: Partial<CommentsBookmarksPayload>): CommentsBookmarksPayload {
    const payload = new CommentsBookmarksPayload();
    Object.assign(payload, props);

    return payload;
  }
}
