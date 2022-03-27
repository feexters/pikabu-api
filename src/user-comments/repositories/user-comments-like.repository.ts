import { EntityRepository, Repository } from 'typeorm';
import { UserCommentsLike } from '../entities';

@EntityRepository(UserCommentsLike)
export class UserCommentsLikeRepository extends Repository<UserCommentsLike> {}
