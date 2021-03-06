import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseOffsetPaginationInput } from 'src/common/inputs';
import { SortType, FilterGroupType } from 'src/common/types/common';

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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags?: string[];

  @IsOptional()
  @IsEnum(FilterGroupType)
  @Field(() => FilterGroupType, { nullable: true })
  groupType?: FilterGroupType;
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
