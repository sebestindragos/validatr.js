# validar.js

JavaScript validation library for NodeJS.

***validar.js*** is written in TypeScript and compiled with ES6 target.

Usage in TypeScript projects is highly recommended since the library uses templates for smart intelisense.

# Instalation

Install the library using `npm install validatr.js`.

# Built in validators

```javascript
  // check if a field is not empty
  notEmpty()

  // check if a field is not equal to value
  notEqual(value: any)

  // check if a field is equal to value
  equal(value: any)

  // check if a fields' length is within bounds
  length(min: number, max?: number)

  // check if a field is a valid email
  isEmail()

  // check if a field is a number and is above value
  min(value: number)
  
  // check if a field is a number and is below value
  max(value: number)

  // custom validator, provide your own function to validate a field.
  // signal errors by throwing exceptions
  must(predicate: {(field: FieldType) : void})
```

# Example usage

Usage with primitive values

```typescript
  import {ValidatR} from 'validatr.js';
  
  let validator = new ValidaR<string>();

  // configure validations
  validator.addRule('email', x => x).notEmpty().isEmail();

  // run validator
  let validation = validator.run('me@example.com');
  
  // check result
  if (!validation.isValid()) {
    // your validation error logic here
    console.error(validation.getErrors());
  }
```

Usage with JSON objects

```typescript
  import {ValidatR} from 'validatr.js';
  
  interface IUser {
    email: string,
    firstname: string,
    lastname: string
  }

  let user: IUser = {
    email: 'sebestin.dragos@gmail.com',
    firstname: 'Dragos',
    lastname: 'Sebestin'
  };

  let validator = new ValidaR<IUser>();

  // configure validations
  validator.addRule('email', x => x.email).notEmpty().isEmail();
  validator.addRule('firstname', x => x.firstname).notEmpty().length(5);
  validator.addRule('lastname', x => x.lastname).notEmpty().length(5, 15);

  // run validator
  let validation = validator.run(user);
  
  // check result
  if (!validation.isValid()) {
    // your validation error logic here
    console.error(validation.getErrors());
  }
```

# Full documentation

***Soon to come.***
