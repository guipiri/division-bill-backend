import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { AuthDecorators } from 'src/auth/auth.decorator';
import {
  SWAGGER_DES_USER_CREATED,
  SWAGGER_DES_USER_DELETED,
  SWAGGER_DES_USER_READ,
  SWAGGER_DES_USER_UPDATED,
} from 'src/constants';
import { CreateUserDto, UpdateUserDto, UuidDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* ------ Route to create user with credentials or google ------ */
  @ApiCreatedResponse({
    description: SWAGGER_DES_USER_CREATED,
    type: User,
  })
  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ) {
    if (createUserDto.google_id)
      return this.usersService.createWithGoogle({
        email: createUserDto.email,
        google_id: createUserDto.google_id,
        name: createUserDto.name,
      });
    return this.usersService.createWithCredentials({
      password: createUserDto.password,
      email: createUserDto.email,
    });
  }
  /* -----------------------------------*/

  /* ------ Route to get all users ------ */
  @AuthDecorators()
  @ApiOkResponse({ description: SWAGGER_DES_USER_READ, type: [User] })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  /* -------------------------------------*/

  /* ------ Route to get user by username or id ------ */
  @AuthDecorators()
  @ApiOkResponse({ description: SWAGGER_DES_USER_READ, type: User })
  @Get(':idOrUsername')
  async findOne(@Param('idOrUsername') idOrUsername: string) {
    if (isUUID(idOrUsername)) {
      return await this.usersService.findById(idOrUsername);
    } else {
      return await this.usersService.findByEmail(idOrUsername);
    }
  }
  /* --------------------------------------------*/

  /* ------ Route to update user ------ */
  @AuthDecorators()
  @ApiResponse({ status: 204, description: SWAGGER_DES_USER_UPDATED })
  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param('id') { id }: UuidDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
  /* -----------------------------------*/

  /* ------ Route to delete user ------ */
  @AuthDecorators()
  @ApiResponse({ status: 204, description: SWAGGER_DES_USER_DELETED })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') { id }: UuidDto) {
    return this.usersService.remove(id);
  }
  /* -----------------------------------*/
}
