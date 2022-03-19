import { EntityRepository, Repository } from 'typeorm';
import { CommentMedia } from '../entities';

@EntityRepository(CommentMedia)
export class CommentMediaRepository extends Repository<CommentMedia> {}
