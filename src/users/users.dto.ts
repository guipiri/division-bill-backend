import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

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
  google_id: string;

  @ApiProperty()
  @IsString()
  password: string;
}

// export class CreateUserDto {
//   @ApiProperty()
//   @IsString()
//   @IsOptional()
//   name?: string;

//   @ApiProperty()
//   @IsEmail()
//   email: string;

//   @ApiProperty()
//   @IsString()
//   @IsOptional()
//   google_id?: string;

//   @ApiProperty()
//   @IsString()
//   @IsOptional()
//   password?: string;
// }

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
  @IsUUID()
  id: string;
}
