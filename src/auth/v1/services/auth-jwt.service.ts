import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/types';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/repositories';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService, private readonly usersRepository: UsersRepository) {}

  async verifyTokenAsync(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    const user = await this.usersRepository.findOne(payload.id);

    if (!user) return null;

    return user;
  }
}
