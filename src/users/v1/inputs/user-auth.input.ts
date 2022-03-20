import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @IsEmail()
  @IsDefined({ message: 'must be a email' })
  @Field(() => String)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @IsDefined({ message: 'must be a password' })
  @Field(() => String)
  password: string;
}

@InputType()
export class SignUpInput extends SignInInput {
  @IsDefined({ message: 'must be a username' })
  @Field(() => String)
  username: string;
}
