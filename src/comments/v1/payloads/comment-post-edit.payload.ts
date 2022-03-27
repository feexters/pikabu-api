import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities';
import { UserError } from 'src/common/types';
import { CommentModel } from '../models';

@ObjectType()
export class CommentPostEditPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => CommentModel, { nullable: true })
  comment?: CommentModel;

  static create(
    props: Partial<Omit<CommentPostEditPayload, 'comment'> & { comment?: Comment }>,
  ): CommentPostEditPayload {
    const payload = new CommentPostEditPayload();

    Object.assign(payload, {
      ...props,
      post: props.comment ? CommentModel.create(props.comment) : undefined,
    });

    return payload;
  }
}
