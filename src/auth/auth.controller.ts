import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto, SignInDto, SignInWithGoogleDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('credentials')
  async signInWithCredentials(@Body() user: SignInDto): Promise<AuthDto> {
    return await this.authService.signIn(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('google')
  async signInWithGoogle(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
  ): Promise<AuthDto> {
    return await this.authService.signInWithGoogle(signInWithGoogleDto);
  }
}
