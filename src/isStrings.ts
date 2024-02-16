import { Envs } from './models';

const isStrings = (envs: Envs): envs is string[] => {
  return Array.isArray(envs) && envs.every((env) => typeof env === 'string');
};

export default isStrings;
