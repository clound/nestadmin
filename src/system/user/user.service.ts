import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new HttpException('Username already exists', 401);
    }
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    const [data, total] = await this.usersRepository.findAndCount({
      select: ['username', 'age'],
    });
    return { data, total };
  }

  async findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: ['username', 'age']
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username']
    });
  }
}
