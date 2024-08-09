import { IPostForm, Post } from '@/types/Post';
import { create } from 'zustand';

interface PostState {
  postData: IPostForm | Post | null;
  setPostData: (postData: IPostForm | Post | null) => void;
  bookmarks: string[];
  setBookmarks: (bookmarks: string[]) => void;
}

export const usePostStore = create<PostState>((set) => ({
  postData: null,
  setPostData: (postData: IPostForm | Post | null) => set({ postData }),
  bookmarks: [],
  setBookmarks: (bookmarks: string[]) => set({ bookmarks }),
}));
