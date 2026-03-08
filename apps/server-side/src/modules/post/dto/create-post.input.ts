import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  title!: string;

  @Field()
  @IsNotEmpty()
  content!: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnail?: string;

  @Field({ nullable: true })
  @IsOptional()
  slug?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @Field(() => Int)
  authorId!: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];
}
