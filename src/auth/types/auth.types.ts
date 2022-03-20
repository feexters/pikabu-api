import { User } from 'src/users/entities';

export interface LoginResultType {
  user: User;
  token: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  expiration: Date;
}
