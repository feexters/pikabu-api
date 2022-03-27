import { User } from 'src/users/entities';
import { Base } from 'src/common/entities';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Comment } from 'src/comments/entities';

const tableName = 'user_comments_bookmarks';

@Entity({
  name: tableName,
})
@Index('UNIQUE_USER_COMMENT_BOOKMARK', ['userId', 'commentId'], {
  unique: true,
})
export class UserCommentsBookmarks extends Base {
  static tableName = tableName;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.usersBookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'commentId',
    referencedColumnName: 'id',
  })
  comment: Comment;

  @ManyToOne(() => User, (user) => user.commentsBookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
