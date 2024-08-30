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
import {
  CreateUserWithCredentialsDto,
  CreateUserWithGoogleDto,
  UpdateUserDto,
} from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createWithCredentials({
    email,
    password,
  }: CreateUserWithCredentialsDto) {
    const emailExists = await this.userRepository.existsBy({ email });
    if (emailExists) throw new ConflictException(USER_ALREADY_EXISTS);

    await this.userRepository.save({
      email,
      name: email.split('@')[0],
      password: bcryptHashSync(password, 10),
    });
    return { success: true, message: 'Usuário criado com sucesso!' };
  }

  async createWithGoogle({ google_id, email, name }: CreateUserWithGoogleDto) {
    await this.userRepository.upsert(
      { google_id, email, name: name ? name : email.split('@')[0] },
      { conflictPaths: ['email'], skipUpdateIfNoValuesChanged: true },
    );
    return { success: true, message: 'Usuário logado com sucesso!' };
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

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`${USER_NOT_FOUND} ${email}`);
    }
    return user;
  }

  async update(id: string, { password, email }: UpdateUserDto) {
    if (!(email && password)) throw new BadRequestException(BAD_REQUEST);

    const emailExists = await this.userRepository.existsBy({ email });

    console.log(emailExists);

    if (emailExists) throw new ConflictException(USER_ALREADY_EXISTS);

    const { affected } = await this.userRepository.update(id, {
      email,
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
