import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../config/prisma/prisma.service.js';
import { LoginInput } from './dto/create-auth.input.js';
import { RegisterInput } from './dto/update-auth.input.js';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await verify(user.password, loginInput.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, user };
  }

  async register(registerInput: RegisterInput) {
    const existing = await this.prisma.user.findUnique({
      where: { email: registerInput.email },
    });
    if (existing) throw new ConflictException('Email already in use');

    const { password, ...rest } = registerInput;
    const hashedPassword = await hash(password);

    const user = await this.prisma.user.create({
      data: { ...rest, password: hashedPassword },
    });

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, user };
  }

  async me(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
