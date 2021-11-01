import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// inherit CreateCoffeeDto with adding a flag @IsOptional by using PartialType
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
