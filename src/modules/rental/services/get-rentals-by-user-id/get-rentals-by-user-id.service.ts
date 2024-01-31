import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { RentalHistory } from '@prisma/client';

@Injectable()
export class GetRentalsByUserIdService {
  constructor(private prisma: PrismaService) {}

  async execute(userId: string): Promise<RentalHistory[]> {
    return await this.prisma.rentalHistory.findMany({ where: { userId } });
  }
}
