import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsUUID, IsDefined } from 'class-validator';
import { UUID } from 'src/common/scalars';

@InputType()
export class CommentPostEditInput {
  @IsDefined()
  @IsUUID()
  @Field(() => UUID, { nullable: false })
  id: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: true })
  comment: string;
}
