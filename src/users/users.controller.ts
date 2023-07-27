import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { SerializerInterceptor } from 'src/interceptor/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller('users')
export class UsersController {
  constructor(public usersService: UsersService) {}
  @Get()
  allUsers() {
    return this.usersService.findAll();
  }

  @UseInterceptors(new SerializerInterceptor(UserDto))
  @Get('/:id')
  async oneUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.usersService.findOne(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
