import { PasswordCriteria } from "../interfaces/password-criteria.interface";

export const PasswordCriteriaExamplesEnum = {
  BASIC: {
    minLength: 6
  } as PasswordCriteria,
  STRONG: {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minDigits: 1,
    minSpecialChars: 1
  } as PasswordCriteria,
};