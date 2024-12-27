import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  name: string;
  
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
