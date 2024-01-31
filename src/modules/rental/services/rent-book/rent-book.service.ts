import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/services/prisma/prisma.service';
import { DateProviderService } from '../../../../providers/date-provider/date-provider.service';
import { CreateRentalDTO } from '../../dtos';
import { RentalHistory } from '@prisma/client';

@Injectable()
export class RentBookService {
  constructor(
    private prisma: PrismaService,
    private dateProvider: DateProviderService,
  ) {}
  async execute({ userId, bookId }: CreateRentalDTO): Promise<RentalHistory> {
    const bookExists = await this.prisma.book.findFirst({
      where: { id: bookId },
    });
    if (!bookExists) {
      throw new NotFoundException('Book does not exists');
    }
    if (!bookExists.available) {
      throw new ForbiddenException('This book is not available');
    }
    await this.prisma.book.update({
      where: { id: bookId },
      data: { available: false },
    });
    const rentDate = this.dateProvider.nowDate();
    const rental = await this.prisma.rentalHistory.create({
      data: { userId, bookId, rentDate },
    });
    return rental;
  }
}
