import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../interfaces/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async getUser(userId: string): Promise<User> {
    if (!validate(userId)) throw new BadRequestException('Invalid Id');

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException("User doesn't exist");

    return user.toResponse();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const addUser = this.userRepository.create({
      id: uuidv4(),
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      ...createUserDto,
    });

    return (await this.userRepository.save(addUser)).toResponse();
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
    userId: string,
  ): Promise<User> {
    if (!validate(userId)) throw new BadRequestException('Invalid Id');

    const { oldPassword, newPassword } = updatePasswordDto;

    const updateUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!updateUser) throw new NotFoundException("User doesn't exist");

    if (updateUser.password !== oldPassword)
      throw new ForbiddenException('Passowrd is wrong');

    updateUser.password = newPassword;
    updateUser.updatedAt = Math.floor(Date.now() / 1000) + 1;
    updateUser.createdAt = +updateUser.createdAt;
    updateUser.version++;

    return (await this.userRepository.save(updateUser)).toResponse();
  }

  async removeUser(userId: string): Promise<void> {
    if (!validate(userId)) throw new BadRequestException('Invalid Id');

    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException("User doesn't exist");
    }
  }
}
