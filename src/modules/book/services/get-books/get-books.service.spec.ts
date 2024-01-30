import { Test, TestingModule } from '@nestjs/testing';
import { GetBooksService } from './get-books.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from '../../dtos';
import { CreateBookService } from '../create-book/create-book.service';

const dto: CreateBookDTO = {
  author: 'Nice author',
  title: 'Cool title',
};

describe('GetBooksService', () => {
  let service: GetBooksService;
  let createBookService: CreateBookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBooksService,
        PrismaService,
        ConfigService,
        CreateBookService,
      ],
    }).compile();

    service = module.get<GetBooksService>(GetBooksService);
    prisma = module.get<PrismaService>(PrismaService);
    createBookService = module.get<CreateBookService>(CreateBookService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get an empty array', async () => {
    const books = await service.execute();
    expect(books.length).toBe(0);
  });

  it('Should be able to receive an array of books', async () => {
    await createBookService.execute(dto);
    const books = await service.execute();
    expect(books.length).toBe(1);
  });
});
