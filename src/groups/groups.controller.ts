import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthDecorators } from 'src/auth/auth.decorator';
import { ChangeMembersDto, GroupDto } from './groups.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
@AuthDecorators()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: GroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll(
    @Query('userId', new ParseUUIDPipe({ optional: true })) userId?: string,
  ) {
    if (userId) return this.groupsService.findByUserId(userId);
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  updateName(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateGroupDto: GroupDto,
  ) {
    return this.groupsService.updateName(id, updateGroupDto);
  }

  @Patch('add-members/:id')
  addMembers(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeMembersDto: ChangeMembersDto,
  ) {
    return this.groupsService.addMembers(id, changeMembersDto);
  }

  @Patch('remove-members/:id')
  removeMembers(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeMembersDto: ChangeMembersDto,
  ) {
    return this.groupsService.removeMembers(id, changeMembersDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.groupsService.remove(id);
  }
}
