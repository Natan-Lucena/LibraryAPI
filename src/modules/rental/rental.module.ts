import { Module } from '@nestjs/common';
import { RentBookService } from './services/rent-book/rent-book.service';
import { DateProviderService } from '../../providers/date-provider/date-provider.service';
import { RentBookController } from './controllers/rent-book/rent-book.controller';
import { GetRentalsByUserIdService } from './services/get-rentals-by-user-id/get-rentals-by-user-id.service';
import { GetRentalsByUserIdController } from './controllers/get-rentals-by-user-id/get-rentals-by-user-id.controller';

@Module({
  providers: [RentBookService, DateProviderService, GetRentalsByUserIdService],
  controllers: [RentBookController, GetRentalsByUserIdController],
})
export class RentalModule {}
