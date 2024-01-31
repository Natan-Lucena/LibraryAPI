import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { RentalModule } from './modules/rental/rental.module';
import { DateProviderService } from './providers/date-provider/date-provider.service';
import { DateProviderModule } from './providers/date-provider/date-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    BookModule,
    RentalModule,
    DateProviderModule,
  ],
  controllers: [],
  providers: [DateProviderService],
})
export class AppModule {}
