# Satiro

### Why Satiro?

Satiro is a small toolkit focused on password validation for Zod. The name is a play on the Portuguese word for Satyr and also stands for **S**chema **A**ssertion **T**ool and custom **I**mplementation for Zod's **R**ules and **O**bjects.

### What is the purpose of this package?

This package provides a compact set of utilities to simplify password validation with Zod:

- A schema creator that returns a Zod schema configured for password rules (length, character classes, etc.).
- A standalone validator that runs password checks and returns a boolean result indicating validation status.
- Predefined password criteria examples for common use cases.

These utilities make it easy to create consistent password assertions across validation layers (forms, APIs, unit tests) while keeping the rules declarative and reusable.

### Installation

```
npm install --save satiro
```

### Introduction and Usage

Below are examples showing the two main functions: schema creator and validator.

#### Schema creator (Zod):

```typescript
import { z } from 'zod';
import { createPasswordSchema, PasswordCriteriaExamplesEnum } from 'satiro';

// Create a Zod schema for passwords with custom requirements
const passwordSchema = createPasswordSchema({
  minLength: 8,
  maxLength: 128,
  minUppercase: 1,
  minLowercase: 1,
  minDigits: 1,
  minSpecialChars: 1,
});

// Use with Zod
const result = passwordSchema.safeParse('P@ssw0rd');
if (!result.success) {
  console.log(result.error.format());
}

// Or use predefined criteria
const strongPasswordSchema = createPasswordSchema(
  PasswordCriteriaExamplesEnum.STRONG
);
```

#### Standalone validator:

```typescript
import { validatePassword, PasswordCriteriaExamplesEnum } from 'satiro';

const isValid = validatePassword('P@ssw0rd', {
  minLength: 8,
  minDigits: 1,
  minUppercase: 1,
  minSpecialChars: 1,
});

console.log(isValid); // true or false

const basicValidation = validatePassword('mypassword', PasswordCriteriaExamplesEnum.BASIC);
console.log(basicValidation); // true or false
```

#### Predefined Criteria Examples
```typescript
PasswordCriteriaExamplesEnum.BASIC = {
  minLength: 6
};

PasswordCriteriaExamplesEnum.STRONG = {
  minLength: 8,
  minUppercase: 1,
  minLowercase: 1,
  minDigits: 1,
  minSpecialChars: 1
};
```

Why use these utilities?

- Reuse the same validation logic across forms and server-side checks.
- Keep rules declarative and configurable.
- Simple boolean return for quick validation checks.
- Built-in integration with Zod for schema-based validation.

### Documentation

[Docs](https://satiro.gabrielhk.dev/)

### Donations

Don't feel obligated. This package is FREE!

[☕️ buy me a coffee](https://ko-fi.com/gabrielhk97)
