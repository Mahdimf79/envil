import dotenv from 'dotenv';

import { Envs, Options } from './models';
import setEnvDetails from './setEnvDetails';
import replacedMessage from './replacedMessage';

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
 * envEnforcer(requiredEnvs, { shouldExit });
 *
 * // Customizing behavior:
 * const customTemplate = '%e is missing. Please set it before proceeding.';
 * const stdout = (message) => console.warn(message);
 *
 * envEnforcer(requiredEnvs, { template: customTemplate, stdout });
 *
 * // Handling optional variables:
 * const mixedEnvs = ['REQUIRED_VAR', 'OPTIONAL_VAR'];
 *
 * envEnforcer(mixedEnvs); // Only reports missing REQUIRED_VAR
 *
 * // With optional variables specified:
 * const mixedEnvsWithOptional = [
 *   { name: 'REQUIRED_VAR', optional: false },
 *   { name: 'OPTIONAL_VAR', optional: true },
 ];
 *
 * envEnforcer(mixedEnvsWithOptional); // Only reports missing REQUIRED_VAR
 */
const envEnforcer = (envs: Envs, options?: Options) => {
  let isEnvMissing = false;

  const envDetails = setEnvDetails(envs);

  for (let i = 0; i < envDetails.length; i++) {
    if (envDetails[i].optional && !process.env[envDetails[i].name]) {
      let message = '%e is not defined';
      if (options) {
        let stdout = options.stdout || console.log;
        message = '%e is not defined' || options.template;
        message = replacedMessage(message, envDetails[i]);
        stdout(message);
      } else {
        console.log(replacedMessage(message, envDetails[i]));
      }
      isEnvMissing = true;
    }
  }
  if (isEnvMissing) {
    if (!options?.shouldExit) {
      return false;
    }
    return process.exit(1);
  }

  return true;
};

export default envEnforcer;
