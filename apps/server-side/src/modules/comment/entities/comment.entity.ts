import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity.js';

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

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
