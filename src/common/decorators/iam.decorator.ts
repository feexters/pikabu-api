import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities';

export const IAM = createParamDecorator((data: keyof User, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req || context.switchToHttp().getRequest();
  const user = request.user;

  if (data) {
    return user[data];
  }

  return user;
});
