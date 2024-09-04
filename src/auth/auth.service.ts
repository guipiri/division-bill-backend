import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';
import {
  AuthDto,
  SignInWithCredentialsDto,
  SignInWithGoogleDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  private expiresIn: number;
  private webClientId: string;
  private iosClientId: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly oAuth2Client: OAuth2Client,
  ) {
    this.expiresIn = this.configService.get<number>('JWT_EXPIRATION_SECONDS');
    this.webClientId = this.configService.get<string>('WEB_CLIENT_ID');
    this.iosClientId = this.configService.get<string>('IOS_CLIENT_ID');
  }

  async signInWithCredentials({
    email,
    password,
  }: SignInWithCredentialsDto): Promise<AuthDto> {
    const user = await this.userService.findByEmail(email);
    if (!bcryptCompareSync(password, user.password))
      throw new UnauthorizedException('Credenciais inválidas');
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
      const ticket = await this.oAuth2Client.verifyIdToken({
        idToken,
        audience: [this.iosClientId, this.webClientId],
      });
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
      console.log(error);

      throw new UnauthorizedException();
    }
  }
}
