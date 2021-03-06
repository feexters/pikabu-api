import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Base } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentMedia } from 'src/comment-media/entities';
import { UserCommentsBookmarks, UserCommentsLike } from 'src/user-comments/entities';

const tableName = 'comments';

@Entity({
  name: tableName,
})
export class Comment extends Base {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'int', default: 0 })
  likesCount: number;

  @Column({ type: 'int', default: 0 })
  dislikesCount: number;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  postId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post?: Post;

  @OneToMany(() => CommentMedia, (commentMedia) => commentMedia.comment)
  media: CommentMedia[];

  @OneToMany(() => UserCommentsLike, (userCommentsLike) => userCommentsLike.comment)
  usersLiked: UserCommentsLike[];

  @OneToMany(() => UserCommentsBookmarks, (userCommentsBookmarks) => userCommentsBookmarks.comment)
  usersBookmarks?: UserCommentsBookmarks[];
}
