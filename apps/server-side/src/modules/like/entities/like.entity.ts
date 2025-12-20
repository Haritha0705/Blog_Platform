import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Like {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  userId!: number;

  @Field(() => Int)
  postId!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
