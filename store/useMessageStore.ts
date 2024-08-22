import { ChatRoomType, Message } from '@/types/Chat';
import { create } from 'zustand';

interface MessageState {
  chatRooms: ChatRoomType[];
  setChatRooms: (
    updateFn: (chatRooms: ChatRoomType[]) => ChatRoomType[]
  ) => void;
  messages: Message[];
  setMessages: (updateFn: (messages: Message[]) => Message[]) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  chatRooms: [],
  setChatRooms: (updateFn) =>
    set((state) => ({ chatRooms: updateFn(state.chatRooms) })),
  messages: [],
  setMessages: (updateFn) =>
    set((state) => ({ messages: updateFn(state.messages) })),
}));
