import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class GetBooksService {
  constructor(private prisma: PrismaService) {}

  async execute(): Promise<Book[]> {
    return await this.prisma.book.findMany();
  }
}
