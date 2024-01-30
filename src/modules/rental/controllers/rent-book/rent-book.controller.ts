import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { RentBookService } from '../../services/rent-book/rent-book.service';
import { GetUser } from 'src/modules/auth/decorators';
import { JwtGuard } from 'src/modules/auth/guard';

@Controller('rental')
@UseGuards(JwtGuard)
export class RentBookController {
  constructor(private rentBookService: RentBookService) {}

  @Post('create/:bookId')
  async handle(@Param('bookId') bookId: string, @GetUser('id') userId: string) {
    return await this.rentBookService.execute({ bookId, userId });
  }
}
