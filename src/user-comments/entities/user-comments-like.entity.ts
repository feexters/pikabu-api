import { Comment } from 'src/comments/entities';
import { Base } from 'src/common/entities';
import { User } from 'src/users/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserCommentLikeType } from '../user-comments.types';

const tableName = 'user_comments_like';

@Entity({
  name: tableName,
})
@Index('UNIQUE_USER_AND_COMMENT_ID', ['userId', 'commentId'], {
  unique: true,
})
export class UserCommentsLike extends Base {
  static tableName = tableName;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  commentId: string;

  @Column({ type: 'enum', enum: UserCommentLikeType, nullable: true })
  type: UserCommentLikeType;

  @ManyToOne(() => Comment, (comment) => comment.usersLiked, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'commentId',
    referencedColumnName: 'id',
  })
  comment: Comment;

  @ManyToOne(() => User, (user) => user.commentsLiked, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
