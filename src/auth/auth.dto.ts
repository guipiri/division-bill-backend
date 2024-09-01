import { IsJWT } from 'class-validator';
import { CreateUserWithCredentialsDto } from 'src/users/users.dto';

export class AuthDto {
  token: string;
  expiresIn: number;
}

export class SignInDto extends CreateUserWithCredentialsDto {}

export class SignInWithGoogleDto {
  @IsJWT()
  idToken: string;
}
