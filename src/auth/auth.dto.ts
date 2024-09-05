import { IsJWT } from 'class-validator';
import { Request } from 'express';
import { CreateUserWithCredentialsDto } from 'src/users/users.dto';

export class AuthDto {
  token: string;
  expiresIn: number;
}

export class SignInWithCredentialsDto extends CreateUserWithCredentialsDto {}

export class SignInWithGoogleDto {
  @IsJWT()
  idToken: string;
}

export interface RequestWithUser extends Request {
  user: AuthUser;
}

export class AuthUser {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
