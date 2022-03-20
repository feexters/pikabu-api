import { validate as classValidate } from 'class-validator';
import { ValidationError } from '../models';

import { formatErrorsObject } from './format-errors-object';

export const validate = async (obj: any): Promise<ValidationError[]> => {
  const errors = await classValidate(obj, {
    skipMissingProperties: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  });
  return formatErrorsObject(errors);
};
