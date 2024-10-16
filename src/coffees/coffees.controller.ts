import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ParseIntPipe2 } from '../common/pipes/parse-int/parse-int2.pipe';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import {
  ApiForbiddenResponse,
  ApiHideProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {
    console.log('CoffeesController instantiated');
  }
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(
    @Protocol('hello') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await this.coffeeService.findAll(paginationQuery);
  }
  @UsePipes(ParseIntPipe2)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return await this.coffeeService.findOne(id);
  }
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    return await this.coffeeService.create(createCoffeeDto);
  }

  @ApiTags('coffees1', 'coffees2')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return await this.coffeeService.update(id, updateCoffeeDto);
  }
  @ApiTags('coffees1')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.coffeeService.remove(id);
  }
}
