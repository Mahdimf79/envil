import dotenv from 'dotenv';

import { Envs, Options, ReturnValues } from './models';
import mapEnvs from './mapEnvs';
import replacedMessage from './replacedMessage';

dotenv.config();

/**
 * Checks whether required environment variables are set.
 *
 * @param {Envs} envs - An array of required environment variable names.
 * @param {Options} [options] - Optional configuration options.
 * @returns {boolean} - `true` or `values` if all required variables are set, `false` otherwise.
 *
 * @throws {Error} - If an invalid `envs` argument is provided.
 *
 * @example
 * // Basic usage:
 * const requiredEnvs = ['API_KEY', 'DATABASE_URL'];
 * const shouldExit = true;
 *
 * envil(requiredEnvs, { shouldExit });
 * 
 * const values = envil(requiredEnvs, { returnValues:true });
 *
 * // Customizing behavior:
 * const customTemplate = '%e is missing. Please set it before proceeding.';
 * const stdout = (message) => console.warn(message);
 *
 * envil(requiredEnvs, { template: customTemplate, stdout });
 *
 * // Handling optional variables:
 * const mixedEnvs = ['REQUIRED_VAR', 'OPTIONAL_VAR'];
 *
 * envil(mixedEnvs); // Only reports missing REQUIRED_VAR
 *
 * // With optional variables specified:
 * const mixedEnvsWithOptional = [
 *   { name: 'REQUIRED_VAR', optional: false },
 *   { name: 'OPTIONAL_VAR', optional: true },
 ];
 *
 * envil(mixedEnvsWithOptional); // Only reports missing REQUIRED_VAR
 */
const envil = (envs: Envs, options?: Options) => {
  let isEnvMissing = false;

  const envDetails = mapEnvs(envs);

  const envValues: ReturnValues = {};

  for (let i = 0; i < envDetails.length; i++) {
    if (envDetails[i].optional && !process.env[envDetails[i].name]) {
      const message = replacedMessage(
        options?.template || '%e is not defined',
        envDetails[i],
      );
      const stdout = options?.stdout || console.log;

      stdout(message);
      isEnvMissing = true;
    }

    envValues[envDetails[i].name] = String(process.env[envDetails[i].name]);
  }

  const isShouldExit = options?.shouldExit || true;
  if (isEnvMissing) {
    if (!isShouldExit) {
      return false;
    }
    return process.exit(1);
  }

  const isShouldReturnValue = options?.returnValues || false;
  if (isShouldReturnValue) {
    return envValues;
  }

  return true;
};

export default envil;
