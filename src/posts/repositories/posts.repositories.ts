import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {}
