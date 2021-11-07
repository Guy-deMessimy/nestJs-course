import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  //   @Get('flavors')
  //   findAll(@Res() response) {
  //     response.status(200).send('This action returns all coffees');
  //   }

  // not a good practice to unuse Nest method, so prefer use Http decorator (testing, dependant to other library)
  //   @Get()
  //   findAll(@Query() paginationQuery) {
  //     const { limit, offset } = paginationQuery;
  //     return `This action returns all coffees. Limit : ${limit}, offset: ${offset}`;
  //   }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `This action returns #${params.id} coffee`;
  //   }

  // to access specific portion of params we can use
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return `This action returns #${id} cofee`;
  //   }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.coffeesService.findOne('' + id);
  }

  // use the http method to set the status response, we can use native express properties by using @Res, see below
  //   @Post()
  //   @HttpCode(HttpStatus.GONE)
  //   create(@Body() body) {
  //     return body;
  //   }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  // as get by id we can pass a string to the method to access a portion of response body
  //   @Post()
  //   create(@Body('name') body) {
  //     return body;
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() body) {
  //     return `This action updates #${id} coffee`;
  //   }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, UpdateCoffeeDto);
  }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return `This action removes #${id} coffee`;
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
