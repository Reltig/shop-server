import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'bebra' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: '123' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'kekma@mail.ru' })
  @IsNotEmpty()
  readonly email: string;
}
