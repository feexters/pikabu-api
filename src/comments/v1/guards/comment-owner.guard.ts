import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from 'src/comments/repositories';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(CommentsRepository)
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const args = ctx.getArgs();
    const commentId = args.input ? (args.input.id as string) : (args.commentId as string);

    const isOwner = await this.commentsRepository.isCommentOwner({
      commentId,
      userId: request.user.id,
    });

    if (!isOwner) {
      throw new ForbiddenException();
    }

    return isOwner;
  }
}
