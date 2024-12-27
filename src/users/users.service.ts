import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private logger: LoggerService
  ) { }

  async create(createUserDto: CreateUserDto) {
    // const hashedPAsswprs =
    try {
      const user = await this.usersRepository.save({
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      } as User
      );
      if (!user) {
        return null
      }
      return user

    }
    catch (err) {
      this.logger.error(err, null)
      return null
    }
  }

  findAll() {
    return this.usersRepository.find({});
  }

  async findOne(id: string) {
    return await this.usersRepository.find({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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
