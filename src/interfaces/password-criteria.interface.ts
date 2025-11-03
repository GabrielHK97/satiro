export interface PasswordCriteria {
  minLength?: number;
  maxLength?: number;
  minUppercase?: number;
  minLowercase?: number;
  minDigits?: number;
  minSpecialChars?: number;
  specialCharsPattern?: string;
}