import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  // input value of the currently processed argument before it is received by our route
  // whatever value is returned from this transform function completely overrides the previous value
  // transformer pipes can perform these functions by interposing the transformation function we create
  // between the client request and the request handler
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return value;
  }
}
