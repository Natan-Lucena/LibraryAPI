import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateBookService } from '../../services/create-book/create-book.service';
import { CreateBookDTO } from '../../dtos';
import { JwtGuard } from 'src/modules/auth/guard';

@Controller('book')
@UseGuards(JwtGuard)
export class CreateBookController {
  constructor(private createBookService: CreateBookService) {}

  @Post('create')
  async handle(@Body() dto: CreateBookDTO) {
    return await this.createBookService.execute(dto);
  }
}
