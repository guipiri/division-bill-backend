import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  googleId: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class CreateUserDto {
  createUser: CreateUserWithCredentialsDto | CreateUserWithGoogleDto;
}

export class CreateUserWithCredentialsDto extends PickType(UserDto, [
  'email',
  'password',
]) {}

export class CreateUserWithGoogleDto extends OmitType(UserDto, ['password']) {}

export class UpdateUserDto extends PartialType(CreateUserWithCredentialsDto) {}

export class UuidDto {
  @ApiProperty()
  // @IsUUID()
  id: string;
}
