import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { UpdatePostInput } from './dto/update-post.input.js';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput) {
    const { tags, ...postData } = createPostInput;

    const slug =
      postData.slug ||
      postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const post = await this.prisma.post.create({
      data: {
        ...postData,
        slug,
        tags: tags?.length
          ? {
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: {
        author: true,
        tags: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    return {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    };
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({
      where: { published: true },
      include: {
        author: true,
        tags: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((p) => ({
      ...p,
      likesCount: p._count.likes,
      commentsCount: p._count.comments,
    }));
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        tags: true,
        comments: { include: { author: true } },
        _count: { select: { likes: true, comments: true } },
      },
    });
    if (!post) throw new NotFoundException(`Post #${id} not found`);

    return {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        tags: true,
        comments: { include: { author: true } },
        _count: { select: { likes: true, comments: true } },
      },
    });
    if (!post)
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    // Increment views
    await this.prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });
    return {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    };
  }

  async findByAuthor(authorId: number) {
    const posts = await this.prisma.post.findMany({
      where: { authorId },
      include: {
        author: true,
        tags: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return posts.map((p) => ({
      ...p,
      likesCount: p._count.likes,
      commentsCount: p._count.comments,
    }));
  }

  async search(query: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        author: true,
        tags: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return posts.map((p) => ({
      ...p,
      likesCount: p._count.likes,
      commentsCount: p._count.comments,
    }));
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const { tags, ...postData } = updatePostInput;

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...postData,
        id: undefined,
        tags: tags
          ? {
              set: [],
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: {
        author: true,
        tags: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    return {
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    };
  }

  async remove(id: number) {
    // Delete related comments and likes first
    await this.prisma.comment.deleteMany({ where: { postId: id } });
    await this.prisma.like.deleteMany({ where: { postId: id } });
    const post = await this.prisma.post.delete({
      where: { id },
      include: {
        author: true,
        _count: { select: { likes: true, comments: true } },
      },
    });
    return { ...post, likesCount: 0, commentsCount: 0 };
  }
}
