## Env Enforcer

**A NodeJS package for validating environment variables**

Env Enforcer is a NodeJS package that allows you to validate environment variables defined in your `.env` file. It can help you ensure that all the variables your application needs are set before it starts.

### Installation

```
npm install env-enforcer
```

### Usage

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const envs = [
  'NODE_ENV',
  'PORT',
  {
    name: 'DATABASE_URL',
    optional: true,
  },
];

checkIfEnvsAreSet(envs, {
  shouldExit: true,
  template: '%e is not set. Please set it in your .env file.',
});
```

### Examples

#### Example 1: Checking for required environment variables

Suppose you have a NodeJS application that requires two environment variables, `NODE_ENV` and `PORT`. You can use Env Enforcer to check for the existence of these variables before starting your application:

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const envs = ['NODE_ENV', 'PORT'];

checkIfEnvsAreSet(envs, {
  shouldExit: true,
});
```

If either of these variables is not set, Env Enforcer will print an error message and terminate the application with exit code 1.

#### Example 2: Using optional environment variables

You can also use Env Enforcer to check for optional environment variables. For example, suppose your application has a database but it can be used in a read-only mode if the `DATABASE_URL` environment variable is not set:

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const envs = [
  'NODE_ENV',
  'PORT',
  {
    name: 'DATABASE_URL',
    optional: true,
  },
];

checkIfEnvsAreSet(envs, {
  shouldExit: false,
  template: '%e is not set. Using read-only mode.',
});
```

If the `DATABASE_URL` variable is not set, Env Enforcer will print a message indicating that the database will be used in read-only mode.

### Options

Env Enforcer provides two optional options:

- **shouldExit:** (default: `true`) If this option is `true`, Env Enforcer will terminate the application with exit code 1 if any errors are encountered. If `false`, it will only print an error message and allow the application to continue running.
- **template:** (default: `%e is not set. Please set it in your .env file.`) You can use this option to customize the error message that Env Enforcer prints.

### Use cases

Env Enforcer can be used for various purposes, including:

- Checking for the existence of environment variables required for your application
- Ensuring that environment variables have valid values
- Preventing your application from starting if environment variables are not set correctly

### Contributing

Env Enforcer is an open-source project and you can contribute to its development by submitting pull requests.

### License

Env Enforcer is released under the MIT license.

## Further examples

Here are some further examples of how Env Enforcer can be used:

- Checking for a specific value for an environment variable:

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const envs = [
  {
    name: 'NODE_ENV',
  },
];

checkIfEnvsAreSet(envs, {
  shouldExit: true,
});
```

- Checking for multiple environment variables with different options:

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const envs = [
  {
    name: 'NODE_ENV',
    optional: true,
  },
  {
    name: 'PORT',
  },
];

checkIfEnvsAreSet(envs, {
  shouldExit: false,
  template: '%e is not set. Using default value of %v.',
});
```

- Using Env Enforcer with a custom logger:

```typescript
import checkIfEnvsAreSet from 'env-enforcer';

const logger = {
  error: (message: string) => {
    console.error(message);
  },
};

checkIfEnvsAreSet(['NODE_ENV', 'PORT'], {
  shouldExit: true,
  logger,
});
```

I hope this helps!
