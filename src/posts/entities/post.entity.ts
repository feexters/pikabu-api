import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities';
import { Base } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostMedia } from 'src/post-media/entities';
import { UserPostsBookmarks, UserPostsLike } from 'src/user-posts/entities';

const tableName = 'posts';

@Entity({
  name: tableName,
})
export class Post extends Base {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int', default: 0 })
  likesCount: number;

  @Column({ type: 'int', default: 0 })
  dislikesCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostMedia, (postMedia) => postMedia.post)
  media: PostMedia[];

  @OneToMany(() => UserPostsLike, (userPostsLike) => userPostsLike.post)
  usersLiked: UserPostsLike[];

  @OneToMany(() => UserPostsBookmarks, (userPostsBookmarks) => userPostsBookmarks.post)
  usersBookmarks: UserPostsBookmarks[];
}
