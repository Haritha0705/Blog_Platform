import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreateTagInput } from './dto/create-tag.input.js';
import { UpdateTagInput } from './dto/update-tag.input.js';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagInput: CreateTagInput) {
    return this.prisma.tag.create({ data: createTagInput });
  }

  async findAll() {
    return this.prisma.tag.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!tag) throw new NotFoundException(`Tag #${id} not found`);
    return tag;
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    return this.prisma.tag.update({
      where: { id },
      data: { name: updateTagInput.name },
    });
  }

  async remove(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
