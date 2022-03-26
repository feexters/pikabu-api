import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageOffsetInfo {
  @Field(() => Number)
  count: number;

  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;
}
