import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import {
  BAD_REQUEST,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/constants';
import { Repository } from 'typeorm';
import { UpdateUserDto, UserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create({ password, username }: UserDto) {
    const usernameExists = await this.userRepository.existsBy({ username });
    if (usernameExists) throw new ConflictException(USER_ALREADY_EXISTS);

    return await this.userRepository.save({
      username,
      password: bcryptHashSync(password, 10),
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${username}`);
    }
    return user;
  }

  async update(id: string, { password, username }: UpdateUserDto) {
    if (!(username && password)) throw new BadRequestException(BAD_REQUEST);

    const usernameExists = await this.userRepository.existsBy({ username });

    console.log(usernameExists);

    if (usernameExists) throw new ConflictException(USER_ALREADY_EXISTS);

    const { affected } = await this.userRepository.update(id, {
      username,
      password: bcryptHashSync(password, 10),
    });
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
  }

  async remove(id: string) {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${id}`);
    }
  }
}
