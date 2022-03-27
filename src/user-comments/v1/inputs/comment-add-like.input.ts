import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'src/common/scalars';
import { UserCommentLikeType } from 'src/user-comments/user-comments.types';

@InputType()
export class CommentAddLikeInput {
  @IsDefined()
  @IsEnum(UserCommentLikeType)
  @Field(() => UserCommentLikeType)
  type: UserCommentLikeType;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => UUID)
  commentId: string;
}
