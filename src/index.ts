import { z } from 'zod';
import { PasswordCriteria } from './interfaces/password-criteria.interface';
import { PasswordCriteriaExamplesEnum } from './enums/password-criteria-examples.enum';

 function validatePassword(
  password: string,
  criteria: PasswordCriteria = {}
): boolean {
  const {
    minLength,
    maxLength,
    minUppercase,
    minLowercase,
    minDigits,
    minSpecialChars,
    specialCharsPattern = '!@#$%^&*()_+\\-=\\[\\]{};\':"\\|,.<>\\/?`~'
  } = criteria;
  
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const digitsCount = (password.match(/\d/g) || []).length;
  const specialCharsRegex = new RegExp(`[${specialCharsPattern}]`, 'g');
  const specialCharsCount = (password.match(specialCharsRegex) || []).length;
  const currentLength = password.length;

  let lengthValid = true;
  if (minLength !== undefined && currentLength < minLength) {
    lengthValid = false;
  }
  if (maxLength !== undefined && currentLength > maxLength) {
    lengthValid = false;
  }

  let uppercaseValid = true;
  if (minUppercase !== undefined && uppercaseCount < minUppercase) {
    uppercaseValid = false;
  }

  let lowercaseValid = true;
  if (minLowercase !== undefined && lowercaseCount < minLowercase) {
    lowercaseValid = false;
  }

  let digitsValid = true;
  if (minDigits !== undefined && digitsCount < minDigits) {
    digitsValid = false;
  }

  let specialCharsValid = true;
  if (minSpecialChars !== undefined && specialCharsCount < minSpecialChars) {
    specialCharsValid = false;
  }

  return lengthValid && uppercaseValid && lowercaseValid && digitsValid && specialCharsValid;
}

function createPasswordSchema(criteria: PasswordCriteria = {}) {
  const {
    minLength,
    maxLength,
    minUppercase,
    minLowercase,
    minDigits,
    minSpecialChars,
    specialCharsPattern = '!@#$%^&*()_+\\-=\\[\\]{};\':"\\|,.<>\\/?`~'
  } = criteria;

  let schema = z.string();

  if (minLength !== undefined) {
    schema = schema.min(minLength);
  }
  if (maxLength !== undefined) {
    schema = schema.max(maxLength);
  }

  if (minUppercase !== undefined) {
    schema = schema.refine(
      (password) => (password.match(/[A-Z]/g) || []).length >= minUppercase
    );
  }

  if (minLowercase !== undefined) {
    schema = schema.refine(
      (password) => (password.match(/[a-z]/g) || []).length >= minLowercase
    );
  }

  if (minDigits !== undefined) {
    schema = schema.refine(
      (password) => (password.match(/\d/g) || []).length >= minDigits
    );
  }

  if (minSpecialChars !== undefined) {
    const specialCharsRegex = new RegExp(`[${specialCharsPattern}]`, 'g');
    schema = schema.refine(
      (password) => (password.match(specialCharsRegex) || []).length >= minSpecialChars
    );
  }

  return schema;
}
export {  PasswordCriteriaExamplesEnum, validatePassword, createPasswordSchema };