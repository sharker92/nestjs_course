import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { resolve } from 'path';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response) {
    response.status(203).send('This action returns all coffees')
    
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #[${id}] coffee`;
  }
  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }
}
