import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe2 implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('Dos');
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed "${val}" is not an integer`,
      );
    }
    return val;
  }
}
