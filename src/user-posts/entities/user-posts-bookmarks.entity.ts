import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Base } from 'src/common/entities';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

const tableName = 'user_posts_bookmarks';

@Entity({
  name: tableName,
})
@Index('UNIQUE_USER_POST_BOOKMARK', ['userId', 'postId'], {
  unique: true,
})
export class UserPostsBookmarks extends Base {
  static tableName = tableName;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  postId: string;

  @ManyToOne(() => Post, (post) => post.usersBookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'postId',
    referencedColumnName: 'id',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.postsBookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
