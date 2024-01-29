import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { CreateUserDTO } from '../../dtos';
import * as argon from 'argon2';

@Injectable()
export class SignUpService {
  constructor(private prisma: PrismaService) {}
  async execute({ name, email, password }: CreateUserDTO) {
    const hash = await argon.hash(password);
    try {
      const user = await this.prisma.user.create({
        data: { name, email, hash },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credential already used');
      }
      throw error;
    }
  }
}
