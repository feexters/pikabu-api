import { EntityRepository, Repository } from 'typeorm';
import { PostMedia } from '../entities';

@EntityRepository(PostMedia)
export class PostMediaRepository extends Repository<PostMedia> {}
