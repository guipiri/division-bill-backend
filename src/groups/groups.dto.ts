import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsString, IsUUID } from 'class-validator';

export class GroupDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class ChangeMembersDto {
  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @ArrayNotEmpty()
  membersIds: string[];
}
