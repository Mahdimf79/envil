export type Options = {
  shouldExit?: boolean;
  template?: string;
  stdout?: any;
};

export type Env = {
  name: string;
  optional?: boolean;
};

export type Envs = string[] | Env[];
