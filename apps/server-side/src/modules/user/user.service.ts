import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });
    if (existing) throw new ConflictException('Email already in use');

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

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const { password, ...data } = updateUserInput;
    const updateData: Record<string, unknown> = { ...data, id: undefined };
    if (password) {
      updateData.password = await hash(password);
    }
    return this.prisma.user.update({ where: { id }, data: updateData });
  }
}
