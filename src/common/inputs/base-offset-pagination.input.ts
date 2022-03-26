import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class BaseOffsetPaginationInput {
  @Field(() => Number, { defaultValue: 1, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Number, { defaultValue: 10, nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;
}
