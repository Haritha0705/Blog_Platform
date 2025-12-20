import { Module } from '@nestjs/common';
import { TagService } from './tag.service.js';
import { TagResolver } from './tag.resolver.js';

@Module({
  providers: [TagResolver, TagService],
})
export class TagModule {}
