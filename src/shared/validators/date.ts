import { AbstractControl, ValidationErrors } from '@angular/forms';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Validator that requires controls to be a correct date
 * @static
 * @returns {ValidationErrors | null}
 */
export function isValidDate(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value == null || value.length === 0) {
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

  if (value == null || value.length === 0) {
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

  if (value == null || value.length === 0) {
    return null;
  }

  return dayjs(today).isBefore(value) ? null : { isBeforeToday: true };
}