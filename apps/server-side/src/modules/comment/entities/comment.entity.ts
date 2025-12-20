import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id!: number;

  @Field()
  content!: string;

  @Field(() => Int)
  authorId!: number;

  @Field(() => Int)
  postId!: number;
}
