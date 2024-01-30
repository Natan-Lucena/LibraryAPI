import { Module } from '@nestjs/common';
import { RentBookService } from './services/rent-book/rent-book.service';
import { DateProviderService } from '../../providers/date-provider/date-provider.service';
import { RentBookController } from './controllers/rent-book/rent-book.controller';

@Module({
  providers: [RentBookService, DateProviderService],
  controllers: [RentBookController],
})
export class RentalModule {}
