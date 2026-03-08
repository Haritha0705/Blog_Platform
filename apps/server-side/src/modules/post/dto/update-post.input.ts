import { CreatePostInput } from './create-post.input.js';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(
  OmitType(CreatePostInput, ['authorId'] as const),
) {
  @Field(() => Int)
  id!: number;
}
