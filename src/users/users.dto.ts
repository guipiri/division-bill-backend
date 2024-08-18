import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

// export class UpdateUserDto {
//   @ApiProperty({ required: false })
//   @IsString()
//   @IsNotEmpty()
//   @IsAlphanumeric()
//   @IsOptional()
//   username?: string;

//   @ApiProperty({ required: false })
//   @IsString()
//   @IsNotEmpty()
//   @IsOptional()
//   password?: string;
// }

export class UpdateUserDto extends PartialType(UserDto) {}

export class UuidDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
