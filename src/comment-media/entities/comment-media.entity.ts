import { Comment } from 'src/comments/entities';
import { MediaBase } from 'src/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'comment_media';

@Entity({
  name: tableName,
})
export class CommentMedia extends MediaBase {
  static tableName = tableName;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.media)
  @JoinColumn({ name: 'commentId', referencedColumnName: 'id' })
  comment?: Comment;
}
