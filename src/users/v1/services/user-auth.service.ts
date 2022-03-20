import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/users/repositories';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, LoginResultType } from 'src/auth/types';
import { getHashedPassword } from 'src/common/utils';
import { User } from 'src/users/entities';
import { SignInInput, SignUpInput } from 'src/users/v1/inputs';

@Injectable()
export class UserAuthService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: JwtService) {}

  async signUp(authInput: SignUpInput): Promise<LoginResultType> {
    const userCreate = this.usersRepository.create({
      ...authInput,
      password: getHashedPassword(authInput.password),
    });

    const user = await this.usersRepository.save(userCreate);

    return this.login(user);
  }

  async signIn(authSignInDto: SignInInput): Promise<LoginResultType> {
    const user = await this.usersRepository.findByCredentials(authSignInDto);

    if (!user) {
      throw new UnauthorizedException('incorrect password or email');
    }

    return this.login(user);
  }

  private login(user: User): LoginResultType {
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      expiration: new Date(),
    };

    return {
      user,
      token: this.jwtService.sign(jwtPayload),
    };
  }
}
