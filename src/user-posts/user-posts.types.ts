import { registerEnumType } from '@nestjs/graphql';

export enum UserPostLikeType {
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}

registerEnumType(UserPostLikeType, {
  name: 'UserPostLikeType',
});
