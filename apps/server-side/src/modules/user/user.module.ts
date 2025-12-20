import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserResolver } from './user.resolver.js';
import { PrismaModule } from '../../config/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
