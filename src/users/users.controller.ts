import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
import {
  CreateUserWithCredentialsDto,
  CreateUserWithGoogleDto,
  UpdateUserDto,
} from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* ------ Route to create user with credentials ------ */
  @ApiCreatedResponse({
    description: SWAGGER_DES_USER_CREATED,
    type: User,
  })
  @Post()
  createWithCredentials(
    @Body()
    { password, email }: CreateUserWithCredentialsDto,
  ) {
    return this.usersService.createWithCredentials({
      password,
      email,
    });
  }
  /* -----------------------------------*/

  /* ------ Route to create user with google ------ */
  @ApiCreatedResponse({
    description: SWAGGER_DES_USER_CREATED,
    type: User,
  })
  @Post('google')
  create(
    @Body()
    { email, google_id, name }: CreateUserWithGoogleDto,
  ) {
    return this.usersService.upsertWithGoogle({
      email,
      google_id,
      name,
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
  @Get(':idOrEmail')
  async findOne(
    @Param(
      'idOrEmail' /*Implementar aqui um pipe personalizado para validar se é um email ou um uuid*/,
    )
    idOrEmail: string,
  ) {
    if (isUUID(idOrEmail)) {
      return await this.usersService.findById(idOrEmail);
    } else {
      return await this.usersService.findByEmail(idOrEmail);
    }
  }
  /* --------------------------------------------*/

  /* ------ Route to update user ------ */
  @AuthDecorators()
  @ApiResponse({ status: 204, description: SWAGGER_DES_USER_UPDATED })
  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
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
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
  /* -----------------------------------*/
}
