import { Injectable } from '@nestjs/common';
import { createDatabaseConnection } from '../bancoDados/database';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto) {
    const db = await createDatabaseConnection();

    const result = await db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [createUserDto.name, createUserDto.email]
    );

    return {
      id: result.lastID,
      ...createUserDto,
    };
  }

  async findAll() {
    const db = await createDatabaseConnection();
    return db.all('SELECT * FROM users');
  }

  async findOne(id: number) {
    const db = await createDatabaseConnection();
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  }

  async update(id: number, updateUserDto: any) {
    const db = await createDatabaseConnection();

    await db.run(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [updateUserDto.name, updateUserDto.email, id]
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const db = await createDatabaseConnection();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
  }
}
