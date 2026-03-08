import { Module } from '@nestjs/common';
import { LikeService } from './like.service.js';
import { LikeResolver } from './like.resolver.js';
import { PrismaModule } from '../../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [LikeResolver, LikeService],
})
export class LikeModule {}
