import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import useAppwrite from '@/lib/useAppwrite';
import {
  getBookmarkedPosts,
  getPostById,
  getUserBookmarks,
} from '@/lib/appwrite';
import { Redirect } from 'expo-router';
import EmptyState from '@/components/EmptyState';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';

const Bookmark = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { user, isLoggedIn, setPostData } = useGlobalContext();
  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;

  const {
    data: posts,
    refetch,
    loading,
  } = useAppwrite(() => getBookmarkedPosts(user?.id));

  const {
    data: bookmarks,
    setData: setBookmarks,
  }: {
    data: string[];
    setData: React.Dispatch<React.SetStateAction<string[]>>;
  } = useAppwrite(() => getUserBookmarks(user?.id));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

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
              setPostData={setPostData}
              setBookmarks={setBookmarks}
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
