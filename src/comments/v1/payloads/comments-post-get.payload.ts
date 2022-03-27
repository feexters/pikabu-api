import { Field, ObjectType } from '@nestjs/graphql';
import { PageOffsetInfo } from 'src/common/models';
import { UserError } from 'src/common/types';
import { CommentModel } from '../models';

@ObjectType()
export class CommentsPostGetPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => [CommentModel], { nullable: true })
  data?: CommentModel[];

  @Field(() => PageOffsetInfo, { nullable: true })
  pageInfo?: PageOffsetInfo;

  static create(props: Partial<CommentsPostGetPayload>): CommentsPostGetPayload {
    const payload = new CommentsPostGetPayload();
    Object.assign(payload, props);

    return payload;
  }
}
