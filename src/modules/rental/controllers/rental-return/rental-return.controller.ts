import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { RentalReturnService } from '../../services/rental-return/rental-return.service';
import { GetUser } from '../../../auth/decorators';
import { JwtGuard } from '../../../auth/guard';

@Controller('rental')
@UseGuards(JwtGuard)
export class RentalReturnController {
  constructor(private rentalReturn: RentalReturnService) {}

  @Put('return/:bookId')
  async handle(@GetUser('id') userId: string, @Param('bookId') bookId: string) {
    return this.rentalReturn.execute({ userId, bookId });
  }
}
