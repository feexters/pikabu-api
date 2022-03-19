import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'users';

@Entity({
  name: tableName,
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;
}
