import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsOptional, IsUUID, IsDefined } from 'class-validator';
import { UUID } from 'src/common/scalars';

@InputType()
export class PostEditInput {
  @IsDefined()
  @IsUUID()
  @Field(() => UUID, { nullable: false })
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  tags: string[];
}
