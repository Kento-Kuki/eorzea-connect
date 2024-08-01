export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  age?: string;
  gender?: string;
  race?: string;
  job?: string;
  activeTime?: string[];
  playStyle?: string[];
  server?: string;
  created_at: Date;
  updated_at: Date;
}
