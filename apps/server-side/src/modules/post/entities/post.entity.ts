import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity.js';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  content!: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Int)
  views!: number;

  @Field()
  published!: boolean;

  @Field(() => Int)
  authorId!: number;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => Int)
  likesCount!: number;

  @Field(() => Int)
  commentsCount!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
