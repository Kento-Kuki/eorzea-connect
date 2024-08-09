import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import Info from '@/components/Info';
import { useGlobalContext } from '@/context/GlobalProvider';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getUserBookmarks } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';
import { Post } from '@/types/Post';
import PostCard from '@/components/PostCard';
import CustomButton from '@/components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';

const Home = () => {
  const { user, isLoggedIn, setPostData } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;

  const { data: posts, loading, refetch } = useAppwrite(getAllPosts);
  const {
    data: bookmarks,
    setData: setBookmarks,
  }: {
    data: string[];
    setData: React.Dispatch<React.SetStateAction<string[]>>;
  } = useAppwrite(() => getUserBookmarks(user?.id));

  console.log(bookmarks);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <BackgroundLayout>
      <SafeAreaView
        className='h-full mx-4 flex-1 relative'
        edges={['top', 'left', 'right']}
      >
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
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <>
              <View className='flex my-6 px-4 space-y-6'>
                <View className='flex justify-between items-start flex-row'>
                  <View>
                    <Text className='font-pmedium text-sm text-gray-100'>
                      Welcome Back
                    </Text>
                    <Text className='text-2xl font-psemibold text-white'>
                      {user?.username}
                    </Text>
                  </View>
                  <View className='mt-1.5'>
                    <Image
                      source={require('../../assets/images/logoIcon.png')}
                      className='w-14 h-12'
                      resizeMode='contain'
                    />
                  </View>
                </View>
              </View>
              <Info />
              <Image
                source={require('../../assets/images/ff14banner.png')}
                className='w-full h-24 my-4'
              />
            </>
          )}
          ListEmptyComponent={() =>
            loading ? (
              <ActivityIndicator
                size={'large'}
                color='primary'
                className='mt-20'
              />
            ) : (
              <EmptyState
                title='No Posts Found'
                subtitle='Be the first one to create a post'
              />
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <CustomButton
          containerStyles='absolute bottom-2 right-2 w-14 h-14 rounded-full'
          onPress={() => router.push('/create')}
        >
          <FontAwesome name='plus' size={24} color='white' />
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Home;
