import { ArgumentMetadata, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    // do not transform if value already is class instance or in array of exceptions
    if (!metatype || !this.toValidate(metatype) || this.isClass(value)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    if (!object) return value;
    return object;
  }

  private toValidate(metatype: Type<any> | undefined): boolean {
    // for nest-dataloader
    const types: any = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }

  private isClass(obj: any): boolean {
    if (obj == null) {
      return false;
    }
    const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
    if (obj.prototype === undefined) {
      return isCtorClass;
    }
    const isPrototypeCtorClass =
      obj.prototype.constructor &&
      obj.prototype.constructor.toString &&
      obj.prototype.constructor.toString().substring(0, 5) === 'class';
    return isCtorClass || isPrototypeCtorClass;
  }
}
