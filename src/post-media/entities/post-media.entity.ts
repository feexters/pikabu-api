import { MediaBase } from 'src/common/entities';
import { Post } from 'src/posts/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'post_media';

@Entity({
  name: tableName,
})
export class PostMedia extends MediaBase {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  postId: string;

  @ManyToOne(() => Post, (post) => post.media, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post?: Post;
}
