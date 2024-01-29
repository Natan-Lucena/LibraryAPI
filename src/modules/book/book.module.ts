import { Module } from '@nestjs/common';
import { CreateBookService } from './services/create-book/create-book.service';
import { CreateBookController } from './controllers/create-book/create-book.controller';

@Module({
  providers: [CreateBookService],
  controllers: [CreateBookController]
})
export class BookModule {}
