import { Field, InterfaceType } from '@nestjs/graphql';

export enum MediaType {
  PHOTO = 'PHOTO',
}

@InterfaceType()
export abstract class UserError {
  @Field()
  field: string;

  @Field(() => [String])
  messages: string[];
}
