import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from './sign-in.service';
import { SignUpService } from '../sign-up/sign-up.service';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../../dtos';
import { ForbiddenException } from '@nestjs/common';

const dto: CreateUserDTO = {
  email: 'cool email',
  password: 'Nice password',
  name: 'amazing name',
};

describe('SignInService', () => {
  let service: SignInService;
  let signUpService: SignUpService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        SignUpService,
        PrismaService,
        ConfigService,
        JwtService,
      ],
    }).compile();

    service = module.get<SignInService>(SignInService);
    signUpService = module.get<SignUpService>(SignUpService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.cleanDb();
  });
  afterAll(async () => {
    await prisma.cleanDb();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be able to login an user', async () => {
    await signUpService.execute(dto);
    const token = await service.execute(dto);
    expect(token).toHaveProperty('token');
  });

  it('Should get an error if user does not exists', async () => {
    try {
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('Should get an error if password does not match', async () => {
    await signUpService.execute(dto);
    dto.password = 'no password';
    try {
      await service.execute(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
