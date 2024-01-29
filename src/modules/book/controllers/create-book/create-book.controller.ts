import { Body, Controller, Post } from '@nestjs/common';
import { CreateBookService } from '../../services/create-book/create-book.service';
import { CreateBookDTO } from '../../dtos';

@Controller('book')
export class CreateBookController {
  constructor(private createBookService: CreateBookService) {}

  @Post('create')
  async handle(@Body() dto: CreateBookDTO) {
    return await this.createBookService.execute(dto);
  }
}
