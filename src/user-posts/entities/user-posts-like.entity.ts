import { Base } from 'src/common/entities';
import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserPostLikeType } from '../user-posts.types';

const tableName = 'user_posts_like';

@Entity({
  name: tableName,
})
@Index('UNIQUE_USER_AND_POST_ID', ['userId', 'postId'], {
  unique: true,
})
export class UserPostsLike extends Base {
  static tableName = tableName;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  postId: string;

  @Column({ type: 'enum', enum: UserPostLikeType, nullable: true })
  type: UserPostLikeType;

  @ManyToOne(() => Post, (post) => post.usersLiked, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'postId',
    referencedColumnName: 'id',
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.postsLiked, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
