import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/users/entities';

export const IAM = createParamDecorator((data: keyof User, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  if (data) {
    return user[data];
  }

  return user;
});
