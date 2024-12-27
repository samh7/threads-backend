import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { plainToClass, plainToClassFromExist } from 'class-transformer';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createCommentDto: CreateCommentDto) {

    console.log("CreateCommentDtop ", createCommentDto)

    const user = await this.userRepository.findOne({
      where: {
        id: createCommentDto.userId,
      },
    });


    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    if (!createCommentDto.parentId) {

      const commentToCreate = {
        text: createCommentDto.text,
        user: user,
        likes: 0,
      };
      return await this.commentRepository.save(commentToCreate);
    }
    const comment = await this.commentRepository.findOne({
      where: {
        id: createCommentDto.parentId,
      },
    });




    const commentToCreate = {
      text: createCommentDto.text,
      parent: comment,
      user: user,
      likes: 0,
    };
    return await this.commentRepository.save(commentToCreate);
  }

  async getTopLevelComments() {
    const topLevelComments: Comment[] = await this.commentRepository.find({
      where: {
        parent: null,
      },
    });

    return topLevelComments.reverse()
  }
  async getCommentsByParentId(parentId: string) {
    const commentsByParentId = await this.commentRepository.find({
      where: {
        parent: {
          id: parentId,

        },

      },
      relations: ["user"]
    });

    const returnComments = [...commentsByParentId].reverse()

    return returnComments
    // return plainToClassFromExist(Comment, returnComments, {
    //   excludeExtraneousValues: true,
    // });
  }

  findAll() {
    return this.commentRepository.findBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
