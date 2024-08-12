import { User } from './User';

export type ChatRoomType = {
  id: string;
  opponent: User | null;
  lastMessage: Message | null;
  updatedAt: string;
};

export type Message = {
  id: string;
  chatRoomId: string;
  user: User;
  content: string;
  createdAt: string;
  isRead: boolean;
};

export type IMessage = {
  chatRoomId: string;
  userId: string;
  content: string;
  isRead: boolean;
};
