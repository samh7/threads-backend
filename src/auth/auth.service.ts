import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private jwtSerice: JwtService
  ) { }


  async validateUser(createAuthDto: CreateAuthDto) {
    const user = await this.usersRepository.findOne({
      where: { email: createAuthDto.email }
    })
    if (
      !user ||
      !await compare(createAuthDto.password, user.password)
    ) {
      return null
    }


    const { password, comments, ...destructedUser } = user

    return { user: destructedUser, token: this.jwtSerice.sign(destructedUser) }
  }



  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
