import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';

@Injectable()
export class FindBookByNameService {
  constructor(private prisma: PrismaService) {}

  async execute(title: string) {
    return await this.prisma.book.findFirst({ where: { title } });
  }
}
