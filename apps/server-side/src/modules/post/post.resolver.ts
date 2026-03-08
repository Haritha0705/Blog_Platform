import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service.js';
import { Post } from './entities/post.entity.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { UpdatePostInput } from './dto/update-post.input.js';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Query(() => Post, { name: 'postBySlug', nullable: true })
  findBySlug(@Args('slug') slug: string) {
    return this.postService.findBySlug(slug);
  }

  @Query(() => [Post], { name: 'postsByAuthor' })
  findByAuthor(@Args('authorId', { type: () => Int }) authorId: number) {
    return this.postService.findByAuthor(authorId);
  }

  @Query(() => [Post], { name: 'searchPosts' })
  search(@Args('query') query: string) {
    return this.postService.search(query);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
