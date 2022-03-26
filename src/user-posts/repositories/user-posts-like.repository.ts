import { EntityRepository, Repository } from 'typeorm';
import { UserPostsLike } from '../entities';

@EntityRepository(UserPostsLike)
export class UserPostsLikeRepository extends Repository<UserPostsLike> {}
