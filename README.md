# Serafim

### Why Satiro?

Satiro is a small toolkit focused on schema assertions for Zod. The name is a play on the Portuguese word for Satyr and also stands for **S**chema **A**ssertion **T**ool and custom **I**mplementation for Zod's **R**ules and **O**bjects.

### What is the purpose of this package?

This package provides a compact set of utilities to simplify password validation with Zod:

- A schema creator that returns a Zod schema configured for password rules (length, character classes, etc.).
- A standalone validator that runs password checks and returns a structured result (valid + errors/criteria).
- A small React-friendly hook to evaluate password criteria in real time (useful for password inputs and UI feedback).

These utilities make it easy to create consistent password assertions across validation layers (forms, APIs, unit tests) while keeping the rules declarative and reusable.

### Instalation

```
npm install --save satiro
```

### Introduction and Usage

Below are short examples showing the three main pieces: schema creator, validator, and hook.

Schema creator (Zod):

```jsx
import { z } from 'zod';
import { createPasswordSchema } from 'satiro';

// create a Zod schema for passwords with common requirements
const passwordSchema = createPasswordSchema({
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
});

// use with zod
const result = passwordSchema.safeParse('P@ssw0rd');
if (!result.success) {
  console.log(result.error.format());
}
```

Standalone validator:

```jsx
import { validatePassword } from 'satiro';

const check = validatePassword('P@ssw0rd', {
  minLength: 8,
  requireNumber: true,
  requireUppercase: true,
});

console.log(check.valid); // true/false
console.log(check.errors); // array of human-friendly messages or codes
```

React hook for realtime UI feedback:

```jsx
import React from 'react';
import { usePasswordCriteria } from 'satiro';

function PasswordInput() {
  const { value, setValue, criteria } = usePasswordCriteria({
    minLength: 8,
    requireNumber: true,
    requireUppercase: true,
  });

  return (
    <div>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter password"
      />
      <ul>
        {criteria.map((c) => (
          <li key={c.id} style={{ color: c.passed ? 'green' : 'red' }}>
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Why use these utilities?

- Reuse the same validation logic across forms and server-side checks.
- Keep rules declarative and configurable.
- Provide clear, testable outputs for UI and logs.

### Documentation

[Docs](https://satiro.gabrielhk.dev/)

### Donations

Don't feel obligated. This package is FREE!

[☕️ buy me a coffee](https://ko-fi.com/gabrielhk97)
