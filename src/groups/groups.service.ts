import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { In, Repository } from 'typeorm';
import { Group } from './group.entity';
import { ChangeMembersDto, GroupDto } from './groups.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create({ name }: GroupDto) {
    this.groupRepository.save({ name });
    return { success: true, message: 'Grupo criado com sucesso!' };
  }

  findAll() {
    return this.groupRepository.find();
  }

  findOne(id: string) {
    return this.groupRepository.findOne({ where: { id } });
  }

  async updateName(groupId: string, groupDto: GroupDto) {
    await this.groupRepository.update({ id: groupId }, groupDto);
    return { success: true, message: 'Grupo atualizado com sucesso!' };
  }

  async addMembers(groupId: string, { membersIds }: ChangeMembersDto) {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: {
        members: true,
      },
    });
    console.log(group);

    const users = await this.userRepository.find({
      where: { id: In(membersIds) },
    });
    group.members = [...group.members, ...users];
    await this.groupRepository.save(group);
    return { success: true, message: 'Membro adicionado com sucesso!' };
  }

  async removeMembers(groupId: string, { membersIds }: ChangeMembersDto) {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: {
        members: true,
      },
    });

    group.members = group.members.filter(({ id }) => !membersIds.includes(id));
    await this.groupRepository.save(group);
    return { success: true, message: 'Membro removido com sucesso!' };
  }

  remove(id: string) {
    this.groupRepository.delete({ id });
    return { success: true, message: 'Grupo removido com sucesso!' };
  }
}
