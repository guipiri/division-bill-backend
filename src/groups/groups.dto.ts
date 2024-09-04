import { IsString, IsUUID } from 'class-validator';

export class GroupDto {
  @IsString()
  name: string;
}

export class ChangeMembersDto {
  @IsUUID(undefined, { each: true })
  membersIds: string[];
}
