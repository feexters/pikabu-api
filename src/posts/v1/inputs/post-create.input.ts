import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { MediaBaseInput } from 'src/common/inputs';

@InputType()
export class PostCreateInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  tags: string[];

  @IsOptional()
  @IsArray()
  @Field(() => [MediaBaseInput], { nullable: true })
  media: MediaBaseInput[];
}
