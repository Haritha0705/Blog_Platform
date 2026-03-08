import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty()
  content!: string;

  @Field(() => Int)
  postId!: number;

  @Field(() => Int)
  authorId!: number;
}
