import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors')
  findAll() {
    return 'This action returns all coffees';
  }

  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `This action returns #${params.id} coffee`;
  //   }

  // to access specific portion of params we can use
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} cofee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  // as get by id we can pass a string to the method to access a portion of response body
  //   @Post()
  //   create(@Body('name') body) {
  //     return body;
  //   }
}
