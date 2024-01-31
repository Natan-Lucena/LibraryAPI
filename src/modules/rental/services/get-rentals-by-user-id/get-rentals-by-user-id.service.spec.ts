import { Test, TestingModule } from '@nestjs/testing';
import { GetRentalsByUserIdService } from './get-rentals-by-user-id.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateBookDTO } from '../../../book/dtos';
import { CreateBookService } from '../../../book/services/create-book/create-book.service';
import { CreateUserDTO } from '../../../auth/dtos';
import { SignUpService } from '../../../auth/services/sign-up/sign-up.service';
import { RentBookService } from '../rent-book/rent-book.service';
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

describe('GetRentalsByUserIdService', () => {
  let service: GetRentalsByUserIdService;
  let createBookService: CreateBookService;
  let createUserService: SignUpService;
  let createRentalService: RentBookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetRentalsByUserIdService,
        ConfigService,
        PrismaService,
        CreateBookService,
        SignUpService,
        RentBookService,
        DateProviderService,
      ],
    }).compile();

    service = module.get<GetRentalsByUserIdService>(GetRentalsByUserIdService);
    createBookService = module.get<CreateBookService>(CreateBookService);
    createUserService = module.get<SignUpService>(SignUpService);
    prisma = module.get<PrismaService>(PrismaService);
    createRentalService = module.get<RentBookService>(RentBookService);
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to get an empty array of rentals', async () => {
    const user = await createUserService.execute(userDto);
    const rentals = await service.execute(user.id);
    expect(rentals.length).toBe(0);
  });

  it('should be able to get an array of rentals', async () => {
    const user = await createUserService.execute(userDto);
    const book = await createBookService.execute(bookDto);
    await createRentalService.execute({ userId: user.id, bookId: book.id });
    const rentals = await service.execute(user.id);
    expect(rentals.length).toBe(1);
  });
});
