import { Test, TestingModule } from '@nestjs/testing';
import { SignUpService } from './sign-up.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { CreateUserDTO } from '../../dtos';
import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const dto: CreateUserDTO = {
  name: 'Cool Name',
  password: 'Nice password',
  email: 'goodEmail@gmail.com',
};

describe('SignUpService', () => {
  let service: SignUpService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpService, PrismaService, ConfigService],
    }).compile();

    service = module.get<SignUpService>(SignUpService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
  });
  afterAll(async () => {
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user', async () => {
    const user = await service.execute(dto);
    expect(user).toHaveProperty('id');
  });

  it('should get an error if use invalid credentials', async () => {
    await service.execute(dto);
    try {
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
