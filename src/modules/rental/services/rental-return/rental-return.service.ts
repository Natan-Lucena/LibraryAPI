import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { DateProviderService } from '../../../../providers/date-provider/date-provider.service';
import { CreateRentalDTO } from '../../dtos';
import { RentalHistory } from '@prisma/client';

@Injectable()
export class RentalReturnService {
  constructor(
    private prisma: PrismaService,
    private dateProvider: DateProviderService,
  ) {}

  async execute({ userId, bookId }: CreateRentalDTO): Promise<RentalHistory> {
    const book = await this.prisma.book.findFirst({ where: { id: bookId } });
    if (book.available) {
      throw new ForbiddenException('Book is not rented');
    }
    const rental = await this.prisma.rentalHistory.findFirst({
      where: { bookId, userId, returnDate: null },
    });
    if (!rental) {
      throw new ForbiddenException('Rental not found');
    }
    const returnDate = this.dateProvider.nowDate();
    const newRental = await this.prisma.rentalHistory.update({
      where: { id: rental.id },
      data: { returnDate },
    });
    await this.prisma.book.update({
      where: { id: bookId },
      data: { available: true },
    });
    return newRental;
  }
}
