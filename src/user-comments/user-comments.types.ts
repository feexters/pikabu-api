import { registerEnumType } from '@nestjs/graphql';

export enum UserCommentLikeType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

registerEnumType(UserCommentLikeType, {
  name: 'UserCommentLikeType',
});
