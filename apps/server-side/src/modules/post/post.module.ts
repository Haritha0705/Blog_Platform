import { Module } from '@nestjs/common';
import { PostService } from './post.service.js';
import { PostResolver } from './post.resolver.js';
import { PrismaModule } from '../../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
