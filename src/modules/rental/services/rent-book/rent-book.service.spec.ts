import { Test, TestingModule } from '@nestjs/testing';
import { RentBookService } from './rent-book.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from '../../../book/dtos';
import { CreateBookService } from '../../../book/services/create-book/create-book.service';
import { CreateUserDTO } from '../../../auth/dtos';
import { SignUpService } from '../../../auth/services/sign-up/sign-up.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { DateProviderService } from '../../../../providers/date-provider/date-provider.service';

const bookDto: CreateBookDTO = {
  author: 'Nice author',
  title: 'Cool title',
};

const userDto: CreateUserDTO = {
  name: 'Cool Name',
  password: 'Nice password',
  email: 'goodEmail@gmail.com',
};

describe('RentBookService', () => {
  let service: RentBookService;
  let createBookService: CreateBookService;
  let createUserService: SignUpService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentBookService,
        ConfigService,
        CreateBookService,
        SignUpService,
        PrismaService,
        DateProviderService,
      ],
    }).compile();

    service = module.get<RentBookService>(RentBookService);
    createBookService = module.get<CreateBookService>(CreateBookService);
    createUserService = module.get<SignUpService>(SignUpService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to rental a book', async () => {
    const book = await createBookService.execute(bookDto);
    const user = await createUserService.execute(userDto);

    const rental = await service.execute({ userId: user.id, bookId: book.id });
    expect(rental).toHaveProperty('id');
  });

  it('should get an error if book does not exists', async () => {
    const user = await createUserService.execute(userDto);
    try {
      await service.execute({ userId: user.id, bookId: '123' });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should get an error if book is not available', async () => {
    const book = await createBookService.execute(bookDto);
    const user = await createUserService.execute(userDto);
    await service.execute({ userId: user.id, bookId: book.id });
    try {
      await service.execute({ userId: user.id, bookId: book.id });
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
