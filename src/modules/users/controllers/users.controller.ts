import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from 'src/modules/users/interfaces/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../users.serialize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers(): User[] {
    const users = this.usersService.getUsers();

    return users.map((user) => new UserEntity(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOne(@Param('id') UserId: string): UserEntity {
    const user = this.usersService.getUser(UserId);

    if (user) return new UserEntity(user);
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.usersService.createUser(createUserDto);

    if (user) return new UserEntity(user);
    else throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Body() updatePassword: UpdatePasswordDto,
    @Param('id') UserId: string,
  ) {
    return this.usersService.updatePassword(updatePassword, UserId);
  }

  @Delete(':id')
  remove(@Param('id') UserId: string) {
    return this.usersService.removeUser(UserId);
  }
}
