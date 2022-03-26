import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'src/common/scalars';
import { UserPostLikeType } from '../../user-posts.types';

@InputType()
export class PostAddLikeInput {
  @IsDefined()
  @IsEnum(UserPostLikeType)
  @Field(() => UserPostLikeType)
  type: UserPostLikeType;

  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => UUID)
  postId: string;
}
