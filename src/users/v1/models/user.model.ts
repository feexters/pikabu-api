import { Field, ObjectType } from '@nestjs/graphql';
import { UUID } from 'src/common/scalars';
import { User } from 'src/users/entities';

@ObjectType()
export class UserModel {
  @Field(() => UUID)
  id: string;

  @Field(() => String)
  username: string;

  private constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }

  static create(props: Partial<User>): UserModel {
    return new UserModel({
      ...props,
    });
  }
}
