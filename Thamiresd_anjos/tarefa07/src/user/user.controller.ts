import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
 constructor(private readonly userService: UsersService) {}


  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<any> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<void> {
    return this.userService.remove(+id);
  }
}
