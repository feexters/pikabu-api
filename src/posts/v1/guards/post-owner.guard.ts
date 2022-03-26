import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/repositories';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(PostsRepository)
    private readonly postsRepository: PostsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const args = ctx.getArgs();
    const postId = args.input ? (args.input.id as string) : (args.postId as string);

    const isOwner = await this.postsRepository.isPostOwner({
      postId,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
