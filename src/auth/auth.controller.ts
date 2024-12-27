import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Http2ServerResponse } from 'http2';
import { User } from 'src/users/entities/user.entity';
import { UserTokenUserDto } from 'src/users/dto/user-token.dto';


@ApiTags("auth")
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @ApiOperation({ summary: "Logins users using email and password" })
  @ApiResponse({
    status: 201,
    description: "It will return the jwt token of the user",
    schema: {
      example: 'your-jwt-token-here',
    },
  })
  @ApiBody({
    description: 'Login credentials for the user',
    type: CreateAuthDto,
  })
  @Post("login")
  @UseGuards(LocalGuard)
  login(
    @Res({ passthrough: true }) res
    , @Req() req: Request) {
    const userTokenObject = req.user as UserTokenUserDto;
    const { user, token } = userTokenObject

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    res.cookie('Authentication', token, {
      httpOnly: true,      // Prevent access from JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
      sameSite: 'Strict',  // Prevent CSRF
      maxAge: 3600000,     // Token expires after 1 hour
    });

    const {  password, comments, ...loginUser } = user
    return { loginUser }
  }

  @ApiOperation({ summary: "Gets the staus of a user's jwt token" })
  @ApiResponse({
    status: 200,
    description: "It will return the decoded user object from the jwt token",
    schema: {
      example: {
        "id": "df12dsf3456789sdfsd",
        "email": "example@email.com",
        "iat": 1734898940,
        "exp": 1734902540
      }
    },
  })
  @Get("status")
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    if (!user)
      throw new HttpException("An error ocurred.", HttpStatus.INTERNAL_SERVER_ERROR)

    const { password, ...createdUser } = user

    return createdUser
  }
}