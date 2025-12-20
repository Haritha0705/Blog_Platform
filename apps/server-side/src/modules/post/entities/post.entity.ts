import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id!: number;

  @Field()
  title!: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  published!: boolean;

  @Field(() => Int)
  authorId!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
