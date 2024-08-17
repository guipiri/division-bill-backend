import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UserDto } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  private expiresIn: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.expiresIn = this.configService.get<number>('JWT_EXPIRATION_SECONDS');
  }

  async signIn({ username, password }: UserDto): Promise<AuthDto> {
    const user = await this.userService.findByUsername(username);

    if (!bcryptCompareSync(password, user.password))
      throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: this.expiresIn,
    };
  }
}
