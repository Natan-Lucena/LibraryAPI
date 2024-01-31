import { Test, TestingModule } from '@nestjs/testing';
import { RentalReturnService } from './rental-return.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from '../../../book/dtos';
import { CreateBookService } from '../../../book/services/create-book/create-book.service';
import { CreateUserDTO } from '../../../auth/dtos';
import { RentBookService } from '../rent-book/rent-book.service';
import { SignUpService } from '../../../auth/services/sign-up/sign-up.service';
import { ForbiddenException } from '@nestjs/common';
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

describe('RentalReturnService', () => {
  let service: RentalReturnService;
  let createBookService: CreateBookService;
  let createUserService: SignUpService;
  let createRentalService: RentBookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalReturnService,
        ConfigService,
        PrismaService,
        CreateBookService,
        SignUpService,
        RentBookService,
        DateProviderService,
      ],
    }).compile();

    service = module.get<RentalReturnService>(RentalReturnService);
    createBookService = module.get<CreateBookService>(CreateBookService);
    createUserService = module.get<SignUpService>(SignUpService);
    prisma = module.get<PrismaService>(PrismaService);
    createRentalService = module.get<RentBookService>(RentBookService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to return a rental', async () => {
    const user = await createUserService.execute(userDto);
    const book = await createBookService.execute(bookDto);
    await createRentalService.execute({ userId: user.id, bookId: book.id });
    const rental = await service.execute({ userId: user.id, bookId: book.id });
    expect(rental.returnDate).toBeDefined();
  });

  it('should not be able to return a rental if the book is not rented', async () => {
    const user = await createUserService.execute(userDto);
    const book = await createBookService.execute(bookDto);
    try {
      await service.execute({ userId: user.id, bookId: book.id });
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
