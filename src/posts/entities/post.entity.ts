import { User } from 'src/users/entities';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'posts';

@Entity({
  name: tableName,
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @Column({ type: 'text' })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: User;
}
