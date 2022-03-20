import { ValidationError } from 'src/common/models/validation-error.model';

export const createValidationError = (field: string, messages: string[], withField = false): ValidationError => {
  const error = new ValidationError();
  error.field = field;
  error.messages = withField ? messages : messages.map((m) => m.replace(field + ' ', ''));
  return error;
};

export const formatErrorsObject = (errors: any[]): ValidationError[] => {
  const validationErrors: ValidationError[] = [];
  errors.forEach((err) => {
    if (Array.isArray(err.value)) {
      const mainProperty = err.property;

      if (err.children.length) {
        err.children.forEach(({ property: indexProperty, children }: any) => {
          const firstChildrenProperty = children[0].property;

          if (children[0].children.length) {
            children[0].children.forEach((item: any) => {
              if (item.children.length) {
                item.children.forEach(({ property: indexProperty2, constraints: constraints2 }: any) => {
                  validationErrors.push(
                    createValidationError(
                      `${mainProperty}.${firstChildrenProperty}.${item.property}.${indexProperty2}`,
                      Object.values(constraints2),
                    ),
                  );
                });
              } else {
                validationErrors.push(
                  createValidationError(
                    `${mainProperty}.${indexProperty}.${firstChildrenProperty}.${item.property}`,
                    Object.values(item.constraints),
                  ),
                );
              }
            });
          } else {
            const errorMessage = children[0].constraints;

            validationErrors.push(
              createValidationError(
                mainProperty + '.' + indexProperty + '.' + firstChildrenProperty,
                Object.values(errorMessage),
              ),
            );
          }
        });
      } else {
        validationErrors.push(createValidationError(mainProperty, Object.values(err.constraints)));
      }
    } else if (err.constraints) {
      validationErrors.push(createValidationError(err.property, Object.values(err.constraints)));
    } else if (err.children && err.children[0] && err.children[0].constraints) {
      validationErrors.push(
        createValidationError(
          err.property + '.' + err.children[0].property,
          Object.values(err.children[0].constraints),
        ),
      );
    }
  });

  return validationErrors;
};
