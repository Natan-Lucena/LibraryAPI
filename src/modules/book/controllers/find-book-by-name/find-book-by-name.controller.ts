import { Controller, Get, Param } from '@nestjs/common';
import { FindBookByNameService } from '../../services/find-book-by-name/find-book-by-name.service';

@Controller('book')
export class FindBookByNameController {
  constructor(private findBookByName: FindBookByNameService) {}

  @Get('find/:name')
  async handle(@Param('name') name: string) {
    return await this.findBookByName.execute(name);
  }
}
