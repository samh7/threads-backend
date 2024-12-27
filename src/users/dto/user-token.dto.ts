import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserTokenUserDto {
    @IsNotEmpty()
    user: User

    @IsString()
    @IsNotEmpty()
    token: string;
}
