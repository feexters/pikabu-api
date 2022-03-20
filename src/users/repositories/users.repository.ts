import { getHashedPassword } from 'src/common/utils';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignInInput } from '../v1/inputs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByCredentials({ email, password }: SignInInput): Promise<User> {
    return this.findOne({ email, password: getHashedPassword(password) });
  }
}
