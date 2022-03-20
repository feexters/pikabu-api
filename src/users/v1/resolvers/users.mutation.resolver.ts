import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { validate } from 'src/common/utils';
import { SignUpInput } from '../inputs';
import { AuthUserPayload } from '../payloads';
import { UserAuthService } from '../services';

@Resolver()
export class UsersMutationResolver {
  constructor(private readonly userAuthService: UserAuthService) {}

  // @Publci()
  // async signIn(@Body() authSignInDto: AuthSignInDto): Promise<AuthResponseDto> {
  //   return AuthResponseDto.create(await this.authService.signIn(authSignInDto));
  // }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => AuthUserPayload)
  async signUp(
    @Args({ name: 'input', type: () => SignUpInput })
    input: SignUpInput,
  ): Promise<AuthUserPayload> {
    console.log(input);
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    return AuthUserPayload.create(await this.userAuthService.signUp(input));
  }
}
