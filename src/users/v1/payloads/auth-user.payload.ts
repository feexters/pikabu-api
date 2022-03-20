import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/common/types';

import { User } from '../../entities';
import { UserModel } from '../models';

@ObjectType()
export class AuthUserPayload {
  @Field(() => [UserError], { nullable: true })
  userErrors?: UserError[];

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => String, { nullable: true })
  token?: string;

  static create(props: Partial<Omit<AuthUserPayload, 'user'> & { user?: User }>): AuthUserPayload {
    const payload = new AuthUserPayload();

    Object.assign(payload, {
      ...props,
      user: props.user ? UserModel.create(props.user) : undefined,
    });

    return payload;
  }
}
