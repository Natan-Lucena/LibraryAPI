import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from '../../services/sign-in/sign-in.service';
import { AuthDTO } from '../../dtos';

@Controller('auth')
export class SignInController {
  constructor(private signInService: SignInService) {}

  @Post('login')
  async handle(@Body() dto: AuthDTO) {
    return this.signInService.execute(dto);
  }
}
