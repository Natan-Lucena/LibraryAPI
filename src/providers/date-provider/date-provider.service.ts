import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateProviderService {
  nowDate() {
    const nowDate = dayjs().toISOString();
    return nowDate;
  }
}
