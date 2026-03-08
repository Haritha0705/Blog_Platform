import { Module } from '@nestjs/common';
import { TagService } from './tag.service.js';
import { TagResolver } from './tag.resolver.js';
import { PrismaModule } from '../../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [TagResolver, TagService],
})
export class TagModule {}
