import { Env } from './models';

const replacedMessage = (message: string, value: Env) => {
  return message.replace('%e', value.name);
};
export default replacedMessage;
