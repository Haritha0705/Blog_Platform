import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreateCommentInput } from './dto/create-comment.input.js';
import { UpdateCommentInput } from './dto/update-comment.input.js';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentInput: CreateCommentInput) {
    return this.prisma.comment.create({
      data: createCommentInput,
      include: { author: true },
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!comment) throw new NotFoundException(`Comment #${id} not found`);
    return comment;
  }

  async findByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    return this.prisma.comment.update({
      where: { id },
      data: { content: updateCommentInput.content },
      include: { author: true },
    });
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
      include: { author: true },
    });
  }
}
