import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Public } from 'src/common/decorators';
import { validate } from 'src/common/utils';
import { SignInInput, SignUpInput } from '../inputs';
import { AuthUserPayload } from '../payloads';
import { UserAuthService } from '../services';

@Resolver()
export class UsersMutationResolver {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Mutation(() => AuthUserPayload)
  @Public()
  async signIn(
    @Args({ name: 'input', type: () => SignInInput })
    input: SignInInput,
  ): Promise<AuthUserPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    return AuthUserPayload.create(await this.userAuthService.signIn(input));
  }

  @Mutation(() => AuthUserPayload)
  @Public()
  async signUp(
    @Args({ name: 'input', type: () => SignUpInput })
    input: SignUpInput,
  ): Promise<AuthUserPayload> {
    const userErrors = await validate(input);

    if (userErrors.length > 0) {
      return {
        userErrors,
      };
    }

    return AuthUserPayload.create(await this.userAuthService.signUp(input));
  }
}
