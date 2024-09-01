import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import { AuthDto, SignInDto, SignInWithGoogleDto } from './auth.dto';

@Injectable()
export class AuthService {
  private expiresIn: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly oAuth2Client: OAuth2Client,
  ) {
    this.expiresIn = this.configService.get<number>('JWT_EXPIRATION_SECONDS');
  }

  async signIn({ email, password }: SignInDto): Promise<AuthDto> {
    const user = await this.userService.findByEmail(email);

    if (!bcryptCompareSync(password, user.password))
      throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: this.expiresIn,
    };
  }

  async signInWithGoogle({ idToken }: SignInWithGoogleDto): Promise<AuthDto> {
    try {
      const ticket = await this.oAuth2Client.verifyIdToken({ idToken });
      const { email } = ticket.getPayload();
      //trocar aqui para pesquisar por google id (criar este serviço no users service)
      const { id } = await this.userService.findByEmail(email);
      const payload = {
        sub: id,
        email,
      };
      return {
        token: this.jwtService.sign(payload),
        expiresIn: this.expiresIn,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
