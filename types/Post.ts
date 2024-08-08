import { User } from './User';

export type Post = {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type IPostForm = {
  title: string;
  content: string;
  author: User;
};
