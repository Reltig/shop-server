import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/autentificated.guard';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupResponse } from './types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponse })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Header('Content-type', 'application/json')
  login(@Request() req) {
    return { user: req.user, msg: 'Logged' };
  }

  @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @UseGuards(AuthenticatedGuard)
  @Header('Content-type', 'application/json')
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/logout')
  @Header('Content-type', 'application/json')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'session has ended' };
  }
}
