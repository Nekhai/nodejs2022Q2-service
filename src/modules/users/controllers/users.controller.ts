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
  HttpCode,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from 'src/modules/users/interfaces/users.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getOne(@Param('id') UserId: string): Promise<User> {
    return await this.usersService.getUser(UserId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id') UserId: string,
  ): Promise<User> {
    return await this.usersService.updatePassword(updatePasswordDto, UserId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') UserId: string): Promise<void> {
    return await this.usersService.removeUser(UserId);
  }
}
