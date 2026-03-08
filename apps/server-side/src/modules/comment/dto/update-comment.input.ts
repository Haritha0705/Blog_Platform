import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @Field(() => Int)
  id!: number;

  @Field()
  @IsNotEmpty()
  content!: string;
}
