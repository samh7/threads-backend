import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // const userToSave: CreateUserDto = {
    //   name: "Sila Mwinzi"
    // }
    return this.usersRepository.save(createUserDto as User);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: number) {
    return await this.usersRepository.find({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isUser = await this.usersRepository.find({
      where: { id: id },
    });

    if (!isUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.usersRepository.update(
      { id: id },
      { name: updateUserDto.name },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
