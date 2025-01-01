import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    cascade: true,
    eager: true,
  })
  @JoinColumn() 
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.parent, {
    nullable: true,
    // eager: true
  })
  @JoinColumn() 
  parent: Comment | null;

  @Column({ default: 0 })
  likes: number;


}
