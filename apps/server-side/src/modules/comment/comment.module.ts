import { Module } from '@nestjs/common';
import { CommentService } from './comment.service.js';
import { CommentResolver } from './comment.resolver.js';
import { PrismaModule } from '../../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
