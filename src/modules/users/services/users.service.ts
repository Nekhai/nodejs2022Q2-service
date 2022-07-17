import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

import { db } from 'src/db.storage';
import { User } from 'src/modules/users/interfaces/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return db.users;
  }

  getUser(id: string) {
    if (validate(id)) {
      return db.users.find((user) => user.id === id);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  createUser(body: CreateUserDto) {
    const addUser = db.users.push({
      id: uuidv4(),
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      ...body,
    });

    return db.users[addUser - 1];
  }

  updatePassword(body: UpdatePasswordDto, id: string): User {
    if (validate(id)) {
      const { oldPassword, newPassword } = body;
      const userIndex = db.users.findIndex((user) => user.id === id);
      const user = db.users[userIndex];

      if (userIndex === -1)
        throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);

      const userPassword = db.users[userIndex].password;

      if (userPassword !== oldPassword) {
        throw new HttpException('Passowrd is wrong', HttpStatus.FORBIDDEN);
      } else {
        if (newPassword) {
          user.password = newPassword;
          user.updatedAt = Math.floor(Date.now() / 1000) + 1;
          user.version = db.users[userIndex].version + 1;

          return db.users[userIndex];
        }
      }
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }

  removeUser(id: string) {
    if (validate(id)) {
      const userIndex: number = db.users.findIndex((user) => user.id === id);

      if (userIndex === -1)
        throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);

      return db.users.splice(userIndex, 1);
    } else {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
  }
}
