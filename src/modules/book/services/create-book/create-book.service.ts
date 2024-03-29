import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { CreateBookDTO } from '../../dtos';
import { Book } from '@prisma/client';

@Injectable()
export class CreateBookService {
  constructor(private prisma: PrismaService) {}
  async execute({ title, author }: CreateBookDTO): Promise<Book> {
    const bookAlreadyExists = await this.prisma.book.findUnique({
      where: { title },
    });
    if (bookAlreadyExists) {
      throw new ForbiddenException('Book already exists');
    }
    const book = await this.prisma.book.create({ data: { title, author } });
    return book;
  }
}
