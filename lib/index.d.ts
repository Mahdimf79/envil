import { Envs, Options } from './option';
/**
 *
 * - `envs`: An array of environment variable names to check.
 * - `exit`: A boolean value indicating whether to exit the process if any of the environment
 */
declare const checkIfEnvsAreSet: (envs: Envs, options?: Options) => void;
export default checkIfEnvsAreSet;
