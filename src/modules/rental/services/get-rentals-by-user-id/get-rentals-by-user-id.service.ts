import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';

@Injectable()
export class GetRentalsByUserIdService {
  constructor(private prisma: PrismaService) {}

  async execute(userId: string) {
    return await this.prisma.rentalHistory.findMany({ where: { userId } });
  }
}
