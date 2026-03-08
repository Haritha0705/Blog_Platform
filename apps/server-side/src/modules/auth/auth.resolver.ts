import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service.js';
import { AuthPayload } from './entities/auth.entity.js';
import { LoginInput } from './dto/create-auth.input.js';
import { RegisterInput } from './dto/update-auth.input.js';
import { User } from '../user/entities/user.entity.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Query(() => User, { name: 'me', nullable: true })
  me(@Args('userId', { type: () => Int }) userId: number) {
    return this.authService.me(userId);
  }
}
