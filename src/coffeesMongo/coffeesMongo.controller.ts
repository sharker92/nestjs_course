import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';

import { CoffeesMongoService } from './coffeesMongo.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ParseIntPipe2 } from 'src/common/pipes/parse-int/parse-int2.pipe';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffeesMongo')
@Controller('coffees')
export class CoffeesMongoController {
  constructor(private readonly coffeeService: CoffeesMongoService) {
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
    return this.coffeeService.findAll(paginationQuery);
  }
  @UsePipes(ParseIntPipe2)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.coffeeService.findOne(id);
  }
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);
    return this.coffeeService.create(createCoffeeDto);
  }

  @ApiTags('coffees1', 'coffees2')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }
  @ApiTags('coffees1')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}
