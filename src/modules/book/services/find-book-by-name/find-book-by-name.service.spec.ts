import { Test, TestingModule } from '@nestjs/testing';
import { FindBookByNameService } from './find-book-by-name.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from '../../dtos';
import { CreateBookService } from '../create-book/create-book.service';

const dto: CreateBookDTO = {
  author: 'Nice author',
  title: 'Cool title',
};

describe('FindBookByNameService', () => {
  let service: FindBookByNameService;
  let createBookService: CreateBookService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindBookByNameService,
        PrismaService,
        CreateBookService,
        ConfigService,
      ],
    }).compile();

    service = module.get<FindBookByNameService>(FindBookByNameService);
    prisma = module.get<PrismaService>(PrismaService);
    createBookService = module.get<CreateBookService>(CreateBookService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to get a null value', async () => {
    const book = await service.execute(dto.title);
    expect(book).toBeNull();
  });

  it('Should be able to receive an array of books', async () => {
    await createBookService.execute(dto);
    const book = await service.execute(dto.title);
    expect(book.title).toBe(dto.title);
  });
});
