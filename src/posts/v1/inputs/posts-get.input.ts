import { InputType } from '@nestjs/graphql';
import { BaseOffsetPaginationInput } from 'src/common/inputs';

@InputType()
export class PostsGetInput extends BaseOffsetPaginationInput {}
