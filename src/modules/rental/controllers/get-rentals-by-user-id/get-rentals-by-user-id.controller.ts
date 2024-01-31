import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetRentalsByUserIdService } from '../../services/get-rentals-by-user-id/get-rentals-by-user-id.service';
import { GetUser } from 'src/modules/auth/decorators';
import { JwtGuard } from 'src/modules/auth/guard';

@Controller('rental')
@UseGuards(JwtGuard)
export class GetRentalsByUserIdController {
  constructor(private getRentalsByUserIdService: GetRentalsByUserIdService) {}

  @Get('getRentals')
  async handle(@GetUser('id') userId: string) {
    return await this.getRentalsByUserIdService.execute(userId);
  }
}
