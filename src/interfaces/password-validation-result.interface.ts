export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  details: {
    length: { current: number; required?: number; valid: boolean };
    uppercase: { current: number; required?: number; valid: boolean };
    lowercase: { current: number; required?: number; valid: boolean };
    digits: { current: number; required?: number; valid: boolean };
    specialChars: { current: number; required?: number; valid: boolean };
  };
}