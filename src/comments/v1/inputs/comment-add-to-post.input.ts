import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, IsOptional, IsUUID } from 'class-validator';
import { MediaBaseInput } from 'src/common/inputs';
import { UUID } from 'src/common/scalars';

@InputType()
export class CommentAddToPostInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false })
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(() => UUID, { nullable: false })
  postId: string;

  @IsOptional()
  @IsArray()
  @Field(() => [MediaBaseInput], { nullable: true })
  media: MediaBaseInput[];
}
