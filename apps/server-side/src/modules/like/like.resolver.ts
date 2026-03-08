import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeService } from './like.service.js';
import { Like } from './entities/like.entity.js';
import { CreateLikeInput } from './dto/create-like.input.js';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  toggleLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likeService.toggleLike(createLikeInput);
  }

  @Query(() => [Like], { name: 'likes' })
  findAll() {
    return this.likeService.findAll();
  }

  @Query(() => Like, { name: 'like', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.findOne(id);
  }

  @Mutation(() => Like)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.remove(id);
  }
}
