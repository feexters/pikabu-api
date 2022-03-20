import { Post } from 'src/posts/entities';
import { Base } from 'src/common/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
