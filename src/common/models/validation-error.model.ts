import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from '../types';

@ObjectType({
  implements: [UserError],
})
export class ValidationError implements UserError {
  @Field()
  field: string;

  @Field(() => [String])
  messages: string[];

  constructor(errorObj?: { field: string; messages: string[] }) {
    if (errorObj) {
      Object.assign(this, errorObj);
    }
  }
}
