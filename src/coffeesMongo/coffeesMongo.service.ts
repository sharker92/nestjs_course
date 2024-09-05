import { Injectable, Scope } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
@Injectable({ scope: Scope.DEFAULT })
export class CoffeesMongoService {
  constructor() {}

  findAll(paginationQuery: PaginationQueryDto) {}
  async findOne(id: number) {}
  async create(createCoffeeDto: CreateCoffeeDto) {}
  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {}
  async remove(id: number) {}
  async recommendCoffee(coffee: Coffee) {}
}
