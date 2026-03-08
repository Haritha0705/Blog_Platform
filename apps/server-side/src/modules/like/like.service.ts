import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreateLikeInput } from './dto/create-like.input.js';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async toggleLike(createLikeInput: CreateLikeInput) {
    const existing = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: createLikeInput.userId,
          postId: createLikeInput.postId,
        },
      },
    });

    if (existing) {
      return this.prisma.like.delete({ where: { id: existing.id } });
    }

    return this.prisma.like.create({ data: createLikeInput });
  }

  async create(createLikeInput: CreateLikeInput) {
    return this.toggleLike(createLikeInput);
  }

  async findAll() {
    return this.prisma.like.findMany();
  }

  async findOne(id: number) {
    return this.prisma.like.findUnique({ where: { id } });
  }

  async findByPost(postId: number) {
    return this.prisma.like.findMany({ where: { postId } });
  }

  async countByPost(postId: number) {
    return this.prisma.like.count({ where: { postId } });
  }

  async remove(id: number) {
    return this.prisma.like.delete({ where: { id } });
  }
}
