import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { SignUpService } from './services/sign-up/sign-up.service';
import { SignInService } from './services/sign-in/sign-in.service';
import { SignUpController } from './controllers/sign-up/sign-up.controller';
import { SignInController } from './controllers/sign-in/sign-in.controller';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [JwtStrategy, SignUpService, SignInService],
  controllers: [SignUpController, SignInController],
})
export class AuthModule {}
