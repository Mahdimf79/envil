import { Envs } from './config';

const isEnvStringValueArray = (envs: Envs): envs is string[] => {
  return Array.isArray(envs) && envs.every((env) => typeof env === 'string');
};

export default isEnvStringValueArray;
