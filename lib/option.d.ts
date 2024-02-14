export type Options = {
    shouldExit?: boolean;
    template?: string;
    stdout?: any;
    callback?: any;
};
export type EnvsValue = {
    name: string;
    optional?: boolean;
};
export type Envs = string[] | EnvsValue[];
