## Envil

**A NodeJS package for validating environment variables**

Envil is a NodeJS package that allows you to validate environment variables defined in your `.env` file. It can help you ensure that all the variables your application needs are set before it starts.

### Installation

```
npm install envil
```

### Usage

```typescript
import envil from 'envil';

const envs = ['NODE_ENV', 'PORT'];

envil(envs, {
  shouldExit: true,
  template: '%e is not set. Please set it in your .env file.',
});
```

### Examples

#### Example 1: Checking for required environment variables

Suppose you have a NodeJS application that requires two environment variables, `NODE_ENV` and `PORT`. You can use Envil to check for the existence of these variables before starting your application:

```typescript
import envil from 'envil';

const envs = ['NODE_ENV', 'PORT'];

envil(envs, {
  shouldExit: true,
});
```

If either of these variables is not set, Envil will print an error message and terminate the application with exit code 1.

#### Example 2: Using optional environment variables

You can also use Envil to check for optional environment variables. For example, suppose your application has a database but it can be used in a read-only mode if the `DATABASE_URL` environment variable is not set:

```typescript
import envil from 'envil';

const envs = [
  {
    name: 'DATABASE_URL',
    optional: true,
  },
];

envil(envs, {
  shouldExit: false,
  template: '%e is not set. Using read-only mode.',
});
```

If the `DATABASE_URL` variable is not set, Envil will print a message indicating that the database will be used in read-only mode.

### Options

Envil provides two optional options:

- **shouldExit:** (default: `true`) If this option is `true`, Envil will terminate the application with exit code 1 if any errors are encountered. If `false`, it will only print an error message and allow the application to continue running.
- **template:** (default: `%e is not set. Please set it in your .env file.`) You can use this option to customize the error message that Envil prints.

### Use cases

Envil can be used for various purposes, including:

- Checking for the existence of environment variables required for your application
- Ensuring that environment variables have valid values
- Preventing your application from starting if environment variables are not set correctly

### Contributing

Envil is an open-source project and you can contribute to its development by submitting pull requests.

### License

Envil is released under the MIT license.

## Further examples

Here are some further examples of how Envil can be used:

- Checking for a specific value for an environment variable:

```typescript
import envil from 'envil';

const envs = [
  {
    name: 'NODE_ENV',
  },
];

envil(envs, {
  shouldExit: true,
});
```

- Checking for multiple environment variables with different options:

```typescript
import envil from 'envil';

const envs = [
  {
    name: 'NODE_ENV',
    optional: true,
  },
  {
    name: 'PORT',
  },
];

envil(envs, {
  shouldExit: false,
  template: '%e is not set. Using default value of %v.',
});
```

- Using Envil with a custom logger:

```typescript
import envil from 'envil';

const logger = (message: string) => {
  console.error(message);
};

envil(['NODE_ENV', 'PORT'], {
  shouldExit: true,
  logger,
});
```

I hope this helps!
