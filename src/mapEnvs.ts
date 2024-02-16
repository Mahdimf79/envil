import isStrings from './isStrings';
import { Env, Envs } from './models';

const mapEnvs = (envs: Envs) => {
  let envDetails: Env[];

  if (isStrings(envs)) {
    envDetails = envs.map((name) => ({
      name,
      optional: true,
    }));
  } else {
    envDetails = envs;
  }

  return envDetails;
};

export default mapEnvs;
