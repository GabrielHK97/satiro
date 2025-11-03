import { z } from 'zod';
import { PasswordCriteria } from './interfaces/password-criteria.interface';
import { PasswordValidationResult } from './interfaces/password-validation-result.interface';
import { PasswordCriteriaExamplesEnum } from './enums/password-criteria-examples.enum';
import { PasswordCriteriaErrorsEnum } from './enums/password-criteria-errors.enum';

 function validatePassword(
  password: string,
  criteria: PasswordCriteria = {}
): PasswordValidationResult {
  const {
    minLength,
    maxLength,
    minUppercase,
    minLowercase,
    minDigits,
    minSpecialChars,
    specialCharsPattern = '!@#$%^&*()_+\\-=\\[\\]{};\':"\\|,.<>\\/?`~'
  } = criteria;

  const errors: string[] = [];
  
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const digitsCount = (password.match(/\d/g) || []).length;
  const specialCharsRegex = new RegExp(`[${specialCharsPattern}]`, 'g');
  const specialCharsCount = (password.match(specialCharsRegex) || []).length;
  const currentLength = password.length;

  let lengthValid = true;
  if (minLength !== undefined && currentLength < minLength) {
    errors.push(PasswordCriteriaErrorsEnum.LENGTH);
    lengthValid = false;
  }
  if (maxLength !== undefined && currentLength > maxLength) {
    errors.push(PasswordCriteriaErrorsEnum.LENGTH);
    lengthValid = false;
  }

  let uppercaseValid = true;
  if (minUppercase !== undefined && uppercaseCount < minUppercase) {
    errors.push(PasswordCriteriaErrorsEnum.UPPERCASE);
    uppercaseValid = false;
  }

  let lowercaseValid = true;
  if (minLowercase !== undefined && lowercaseCount < minLowercase) {
    errors.push(PasswordCriteriaErrorsEnum.LOWERCASE);
    lowercaseValid = false;
  }

  let digitsValid = true;
  if (minDigits !== undefined && digitsCount < minDigits) {
    errors.push(PasswordCriteriaErrorsEnum.DIGITS);
    digitsValid = false;
  }

  let specialCharsValid = true;
  if (minSpecialChars !== undefined && specialCharsCount < minSpecialChars) {
    errors.push(PasswordCriteriaErrorsEnum.SPECIAL_CHARS);
    specialCharsValid = false;
  }

  return {
    isValid: errors.length === 0,
    errors,
    details: {
      length: { 
        current: currentLength, 
        required: minLength, 
        valid: lengthValid 
      },
      uppercase: { 
        current: uppercaseCount, 
        required: minUppercase, 
        valid: uppercaseValid 
      },
      lowercase: { 
        current: lowercaseCount, 
        required: minLowercase, 
        valid: lowercaseValid 
      },
      digits: { 
        current: digitsCount, 
        required: minDigits, 
        valid: digitsValid 
      },
      specialChars: { 
        current: specialCharsCount, 
        required: minSpecialChars, 
        valid: specialCharsValid 
      }
    }
  };
}



// Zod schema factory for password validation
function createPasswordSchema(criteria: PasswordCriteria = {}, message = '') {
  return z.string().refine(
    (password: string) => {
      const result = validatePassword(password, criteria);
      return result.isValid;
    },
    { message }
  );
}

// Hook for real-time password validation (if using in React components)
function usePasswordValidation(password: string, criteria: PasswordCriteria = {}) {
  return validatePassword(password, criteria);
}

export {  PasswordCriteriaExamplesEnum, PasswordCriteriaErrorsEnum, validatePassword, createPasswordSchema, usePasswordValidation };