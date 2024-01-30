import { Module } from '@nestjs/common';
import { CreateBookService } from './services/create-book/create-book.service';
import { CreateBookController } from './controllers/create-book/create-book.controller';
import { GetBooksService } from './services/get-books/get-books.service';
import { GetBooksController } from './controllers/get-books/get-books.controller';
import { FindBookByNameService } from './services/find-book-by-name/find-book-by-name.service';
import { FindBookByNameController } from './controllers/find-book-by-name/find-book-by-name.controller';

@Module({
  providers: [CreateBookService, GetBooksService, FindBookByNameService],
  controllers: [CreateBookController, GetBooksController, FindBookByNameController]
})
export class BookModule {}
