import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRentalDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
