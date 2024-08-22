import {
  View,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

import useAppwrite from '@/lib/useAppwrite';
import { getBookmarkedPosts, getUserBookmarks } from '@/lib/appwrite';
import { Redirect } from 'expo-router';
import EmptyState from '@/components/EmptyState';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';
import { useAuthStore } from '@/store/useAuthStore';
import { usePostStore } from '@/store/usePostState';

const Bookmark = () => {
  const [refreshing, setRefreshing] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setBookmarks = usePostStore((state) => state.setBookmarks);

  const {
    data: posts,
    refetch,
    loading,
  } = useAppwrite({
    fetchFn: user
      ? () => getBookmarkedPosts(user?.id)
      : () => Promise.resolve([]),
  });

  const { data: bookmarks } = useAppwrite({
    fetchFn: user
      ? () => getUserBookmarks(user?.id)
      : () => Promise.resolve([]),
    setFn: (newBookmarks) => setBookmarks(() => newBookmarks),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;
  return (
    <BackgroundLayout>
      <SafeAreaView className=' h-full mx-4' edges={['top', 'left', 'right']}>
        <FlatList
          data={posts as Post[]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              userId={user?.id}
              refetch={refetch}
              isBookmarked={bookmarks?.includes(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <View className='h-[80vh] flex-1 justify-center items-center'>
              {loading ? (
                <ActivityIndicator size='large' color='white' />
              ) : (
                <EmptyState
                  title='No Posts Found'
                  subtitle='You have not bookmarked any posts yet.'
                />
              )}
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Bookmark;
