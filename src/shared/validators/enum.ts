import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import isNil from 'lodash.isnil';
import isString from 'lodash.isstring';

/**
 * Validator that checks if enum includes value
 * @static
 * @returns {ValidationErrors | null}
 */
export function isEnum(enumObject: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const enumValues = Object.values(enumObject);

    if (isNil(value) || isString(value)) {
      return null;
    }

    return enumValues.includes(value) ? null : { invalidEnum: true };
  };
}
