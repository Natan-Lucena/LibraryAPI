import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookService } from './create-book.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { CreateBookDTO } from '../../dtos';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const dto: CreateBookDTO = {
  author: 'Nice author',
  title: 'Cool title',
};

describe('CreateBookService', () => {
  let service: CreateBookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBookService, PrismaService, ConfigService],
    }).compile();

    service = module.get<CreateBookService>(CreateBookService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a book', async () => {
    const book = await service.execute(dto);
    expect(book).toHaveProperty('id');
  });

  it('should not able to create a book with invalid title', async () => {
    await service.execute(dto);
    try {
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
