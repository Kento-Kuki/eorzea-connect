import { IPostForm, Post } from '@/types/Post';
import { create } from 'zustand';

interface PostState {
  postData: IPostForm | Post | null;
  setPostData: (postData: IPostForm | Post | null) => void;
  bookmarks: string[];
  setBookmarks: (updateFn: (bookmarks: string[]) => string[]) => void;
}

export const usePostStore = create<PostState>((set) => ({
  postData: null,
  setPostData: (postData: IPostForm | Post | null) => set({ postData }),
  bookmarks: [],
  setBookmarks: (updateFn) =>
    set((state) => ({ bookmarks: updateFn(state.bookmarks) })),
}));
