import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../../dtos';
import { SignUpService } from '../../services/sign-up/sign-up.service';

@Controller('auth')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  @Post('signUp')
  async handle(@Body() dto: CreateUserDTO) {
    return this.signUpService.execute(dto);
  }
}
