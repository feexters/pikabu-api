import { Field, ObjectType } from '@nestjs/graphql';
import { MediaType } from 'src/common/types';

@ObjectType()
export class MediaBaseModel {
  @Field(() => String)
  source: string;

  @Field(() => MediaType)
  type: MediaType;
}
