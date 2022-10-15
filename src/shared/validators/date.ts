import { AbstractControl, ValidationErrors } from '@angular/forms';
import dayjs from 'dayjs';
import isNil from 'lodash.isnil';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const VALID_DATE_LENGTH = 10;

const isDate = (value: string) => {
  return !isNil(value) && value.length === VALID_DATE_LENGTH;
};

/**
 * Validator that requires controls to be a correct date
 * @static
 * @returns {ValidationErrors | null}
 */
export function isValidDate(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!isDate(value)) {
    return null;
  }

  const parsedDate = dayjs(value, 'YYYY/MM/DD', true);

  return parsedDate.isValid() ? null : { invalidDate: true };
}

/**
 * Validator that requires controls to be a date in past
 * @static
 * @returns {ValidationErrors | null}
 */
export function isAfterToday(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  const today = dayjs();

  if (!isDate(value)) {
    return null;
  }

  return dayjs(today).isAfter(value) ? null : { isAfterToday: true };
}

/**
 * Validator that requires controls to be a date in future
 * @static
 * @returns {ValidationErrors | null}
 */
export function isBeforeToday(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  const today = dayjs();

  if (!isDate(value)) {
    return null;
  }

  return dayjs(today).isBefore(value) ? null : { isBeforeToday: true };
}
