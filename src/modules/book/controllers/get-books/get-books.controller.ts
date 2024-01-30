import { Controller, Get } from '@nestjs/common';
import { GetBooksService } from '../../services/get-books/get-books.service';

@Controller('book')
export class GetBooksController {
  constructor(private getBooksService: GetBooksService) {}

  @Get('get')
  async handle() {
    return this.getBooksService.execute();
  }
}
