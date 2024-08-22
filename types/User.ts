export interface User {
  id: string;
  accountId: string;
  username: string;
  email: string;
  avatar: string;
  age?: string;
  gender?: string;
  race?: string;
  job?: string;
  activeTime?: string[];
  playStyle?: string[];
  server?: string;
  dataCenter?: string;
  isSetupComplete: boolean;
}

export interface IUserForm {
  username: string;
  avatar: string;
  age: string;
  gender: string;
  race: string;
  job: string;
  dataCenter: string;
  server: string;
  playStyle: string[];
  activeTime: string[];
}

export type ISearch = {
  age: string | null;
  gender: string | null;
  race: string | null;
  job: string | null;
  dataCenter: string | null;
  server: string | null;
  playStyle: string[] | null;
  activeTime: string[] | null;
};

export interface SelectType {
  label: string;
  value: string;
}

export interface ServerType {
  dataCenter: string;
  server: string;
}
export type ServerOptions = {
  [key: string]: SelectType[];
};
export type SelectData = {
  gender: SelectType[];
  age: SelectType[];
  servers: {
    dataCenter: SelectType[];
    server: ServerOptions;
  };
  race: SelectType[];
  job: SelectType[];
};
