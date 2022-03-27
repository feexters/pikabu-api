import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseOffsetPaginationInput } from 'src/common/inputs';
import { SortType } from 'src/common/types/common';
import { UUID } from '../../../common/scalars/uuid.scalar';

@InputType()
class CommentsPostGetOrder {
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
export class CommentsPostGetInput extends BaseOffsetPaginationInput {
  @IsDefined()
  @IsUUID()
  @Field(() => UUID)
  postId: string;

  @IsOptional()
  @Field(() => CommentsPostGetOrder, { nullable: true })
  order?: CommentsPostGetOrder;
}
