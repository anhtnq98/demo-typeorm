import { UpdatePhotoDto } from './../photos/dtos/createPhoto.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos/createUser.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(CreateUserDto);
    return this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: any) {
    console.log(id);
    const findUser = await this.usersRepository.findOneBy({ id });
    console.log(updateUserDto);
    findUser.email = updateUserDto.email;
    findUser.password = updateUserDto.password;
    return await this.usersRepository.save(findUser);
  }

  async remove(id: string) {
    try {
      const checkId = await this.usersRepository.findOne({
        where: { id },
      });
      if (!checkId) {
        throw new BadRequestException('User not found');
      }
      return await this.usersRepository.remove(checkId);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
