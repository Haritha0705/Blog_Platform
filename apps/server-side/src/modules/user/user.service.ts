import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...user } = createUserInput;

    const hashedPassword = await hash(password);

    return this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        password: hashedPassword,
      },
    });
  }
}
