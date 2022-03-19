import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}
