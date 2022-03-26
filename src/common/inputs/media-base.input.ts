import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsUrl } from 'class-validator';
import { MediaType } from '../types';

@InputType()
export class MediaBaseInput {
  @IsDefined()
  @IsUrl()
  @Field(() => String)
  source: string;

  @IsDefined()
  @IsEnum(MediaType)
  @Field(() => MediaType)
  type: MediaType;
}
