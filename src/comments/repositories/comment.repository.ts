import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {}
