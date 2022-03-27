import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseOffsetPaginationInput } from 'src/common/inputs';
import { SortType } from 'src/common/types/common';

@InputType()
class PostsGetOrder {
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
class PostGetFilter {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true, defaultValue: '' })
  search?: string;
}

@InputType()
export class PostsGetInput extends BaseOffsetPaginationInput {
  @IsOptional()
  @Field(() => PostsGetOrder, { nullable: true })
  order?: PostsGetOrder;

  @IsOptional()
  @Field(() => PostGetFilter, { nullable: true })
  filters?: PostGetFilter;
}
