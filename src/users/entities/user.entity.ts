import { Post } from 'src/posts/entities';
import { Base } from 'src/common/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPostsBookmarks, UserPostsLike } from 'src/user-posts/entities';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => UserPostsLike, (userPostsLike) => userPostsLike.user)
  postsLiked: UserPostsLike[];

  @OneToMany(() => UserPostsBookmarks, (userPostsBookmarks) => userPostsBookmarks.user)
  postsBookmarks: UserPostsBookmarks[];
}
