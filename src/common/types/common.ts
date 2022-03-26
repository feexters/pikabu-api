import { Field, InterfaceType, registerEnumType } from '@nestjs/graphql';

export enum MediaType {
  PHOTO = 'PHOTO',
}

registerEnumType(MediaType, {
  name: 'MediaType',
});

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortType, {
  name: 'SortType',
});

@InterfaceType()
export abstract class UserError {
  @Field()
  field: string;

  @Field(() => [String])
  messages: string[];
}
