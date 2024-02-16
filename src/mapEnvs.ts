import isStrings from './isStrings';
import { Env, Envs } from './models';

const mapEnvs = (envs: Envs) => {
  if (isStrings(envs)) {
    return envs.map((name) => ({
      name,
      optional: true,
    }));
  }

  return envs;
};

export default mapEnvs;
