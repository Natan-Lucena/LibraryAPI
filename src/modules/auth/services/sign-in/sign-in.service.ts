import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { AuthDTO } from '../../dtos';
import * as argon from 'argon2';

@Injectable()
export class SignInService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async execute({ email, password }: AuthDTO) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const passwordMatch = await argon.verify(user.hash, password);
    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return await this.signToken(user.id, user.email);
  }

  private async signToken(
    userId: string,
    email: string,
  ): Promise<{ token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return { token };
  }
}
