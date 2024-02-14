import dotenv from 'dotenv';

import { Envs, EnvsValue, Options } from './config';
import isEnvStringValueArray from './isEnvStringValueArray';

dotenv.config();

/**
 * Checks whether required environment variables are set.
 *
 * @param {Envs} envs - An array of required environment variable names.
 * @param {Options} [options] - Optional configuration options.
 * @returns {boolean} - `true` if all required variables are set, `false` otherwise.
 *
 * @throws {Error} - If an invalid `envs` argument is provided.
 *
 * @example
 * // Basic usage:
 * const requiredEnvs = ['API_KEY', 'DATABASE_URL'];
 * const shouldExit = true;
 *
 * checkIfEnvsAreSet(requiredEnvs, { shouldExit });
 *
 * // Customizing behavior:
 * const customTemplate = '%e is missing. Please set it before proceeding.';
 * const stdout = (message) => console.warn(message);
 *
 * checkIfEnvsAreSet(requiredEnvs, { template: customTemplate, stdout });
 *
 * // Handling optional variables:
 * const mixedEnvs = ['REQUIRED_VAR', 'OPTIONAL_VAR'];
 *
 * checkIfEnvsAreSet(mixedEnvs); // Only reports missing REQUIRED_VAR
 *
 * // With optional variables specified:
 * const mixedEnvsWithOptional = [
 *   { name: 'REQUIRED_VAR', optional: false },
 *   { name: 'OPTIONAL_VAR', optional: true },
 ];
 *
 * checkIfEnvsAreSet(mixedEnvsWithOptional); // Only reports missing REQUIRED_VAR
 */
const checkIfEnvsAreSet = (envs: Envs, options?: Options) => {
  let status = false;

  let envsWithOptional: EnvsValue[];

  if (isEnvStringValueArray(envs)) {
    envsWithOptional = envs.map((name) => ({
      name,
      optional: true,
    }));
  } else {
    envsWithOptional = envs;
  }

  for (let i = 0; i < envsWithOptional.length; i++) {
    if (
      envsWithOptional[i].optional &&
      !process.env[envsWithOptional[i].name]
    ) {
      let message = '%e is not defined';
      if (options) {
        if (options.template) {
          message = options.template;
        }
        message = message.replace('%e', envsWithOptional[i].name);
        if (options.stdout) {
          options.stdout(message);
        } else {
          console.log(message);
        }
      } else {
        console.log(message.replace('%e', envsWithOptional[i].name));
      }
      status = true;
    }
  }
  if (status) {
    if (!options?.shouldExit) {
      return false;
    }
    return process.exit(1);
  }

  return true;
};

export default checkIfEnvsAreSet;
