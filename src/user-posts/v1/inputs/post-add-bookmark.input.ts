import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'src/common/scalars';

@InputType()
export class PostAddBookmarkInput {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => UUID)
  postId: string;
}
