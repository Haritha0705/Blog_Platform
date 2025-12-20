import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './config/prisma/prisma.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './modules/post/post.module.js';
import { UserModule } from './modules/user/user.module.js';
import { CommentModule } from './modules/comment/comment.module.js';
import { TagModule } from './modules/tag/tag.module.js';
import { LikeModule } from './modules/like/like.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot(<ApolloDriverConfig>{
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/graphql/schema.gql"),
    }),
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
