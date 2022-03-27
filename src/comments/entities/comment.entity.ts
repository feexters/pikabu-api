import { Post } from 'src/posts/entities';
import { User } from 'src/users/entities';
import { Base } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentMedia } from 'src/comment-media/entities';

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
}
