import { Module } from '@nestjs/common';
import { CreateBookService } from './services/create-book/create-book.service';
import { CreateBookController } from './controllers/create-book/create-book.controller';
import { GetBooksService } from './services/get-books/get-books.service';
import { GetBooksController } from './controllers/get-books/get-books.controller';

@Module({
  providers: [CreateBookService, GetBooksService],
  controllers: [CreateBookController, GetBooksController]
})
export class BookModule {}
