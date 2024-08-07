import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import { getMyPosts, signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import UserCard from '@/components/UserCard';
import { FontAwesome } from '@expo/vector-icons';
import useAppwrite from '@/lib/useAppwrite';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';
import EmptyState from '@/components/EmptyState';

const Profile = () => {
  const { user, setUser, setIsLoggedIn, isLoading } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  if (!isLoading && !user) return <Redirect href='/sign-in' />;

  const {
    data: posts,
    loading,
    refetch,
  } = useAppwrite(() => getMyPosts(user?.id!));

  const onSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4' edges={['top', 'left', 'right']}>
        <View className='flex flex-row justify-end my-2'>
          <TouchableOpacity onPress={onSignOut}>
            <FontAwesome name='sign-out' size={28} color='white' />
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          showsVerticalScrollIndicator={false}
        >
          <View className='flex justify-center items-center mb-5'>
            <Text className='font-psemibold text-3xl text-white'>
              My Profile
            </Text>
          </View>
          <UserCard user={user!} />
          <View className='flex justify-center items-center space-y-10 mt-5'>
            <Text className='font-psemibold text-3xl text-white text-center'>
              My Posts
            </Text>
            {loading ? (
              <ActivityIndicator size='large' color='white' />
            ) : posts ? (
              posts.map((post: Post) => <PostCard key={post.id} post={post} />)
            ) : (
              <EmptyState
                title='No Posts Found'
                subtitle='Be the first one to create a post'
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Profile;
