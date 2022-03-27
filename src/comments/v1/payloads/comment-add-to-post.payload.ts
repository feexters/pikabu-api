import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/common/types';

import { Comment } from '../../entities';
import { CommentModel } from '../models';

@ObjectType()
export class CommentAddToPostPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => CommentModel, { nullable: true })
  comment?: CommentModel;

  static create(
    props: Partial<Omit<CommentAddToPostPayload, 'comment'> & { comment?: Comment }>,
  ): CommentAddToPostPayload {
    const payload = new CommentAddToPostPayload();

    Object.assign(payload, {
      ...props,
      comment: props.comment ? CommentModel.create(props.comment) : undefined,
    });

    return payload;
  }
}
