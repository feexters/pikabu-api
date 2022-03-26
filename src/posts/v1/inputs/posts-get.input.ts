import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseOffsetPaginationInput } from 'src/common/inputs';
import { SortType } from 'src/common/types/common';

@InputType()
export class OrderPostsGetInput {
  @IsOptional()
  @IsEnum(SortType)
  @Field(() => SortType, { nullable: true })
  createdAt?: SortType;

  @IsOptional()
  @IsEnum(SortType)
  @Field(() => SortType, { nullable: true })
  likesCount?: SortType;
}

@InputType()
export class PostsGetInput extends BaseOffsetPaginationInput {
  @IsOptional()
  @Field(() => OrderPostsGetInput, { nullable: true })
  order?: OrderPostsGetInput;
}
