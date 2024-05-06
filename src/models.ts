export type Options = {
  shouldExit?: boolean;
  template?: string;
  stdout?: any;
  returnValues?: boolean;
};

export type Env = {
  name: string;
  optional?: boolean;
};

export type Envs = string[] | Env[];

export type ReturnValues = Record<string, string>;
