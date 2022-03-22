import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PostsQueryResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
