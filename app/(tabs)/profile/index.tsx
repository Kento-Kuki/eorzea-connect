import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import { getMyPosts, signOut } from '@/lib/appwrite';
import UserCard from '@/components/UserCard';
import { FontAwesome } from '@expo/vector-icons';
import useAppwrite from '@/lib/useAppwrite';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';
import EmptyState from '@/components/EmptyState';
import { useAuthStore } from '@/store/useAuthStore';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: posts = [],
    loading,
    refetch,
  } = useAppwrite({
    fetchFn: user ? () => getMyPosts(user.id) : () => Promise.resolve([]),
  });

  const onSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;
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
          <View className=' space-y-10 mt-5'>
            <Text className='font-psemibold text-3xl text-white text-center'>
              My Posts
            </Text>
            {loading ? (
              <ActivityIndicator size='large' color='white' />
            ) : posts && posts.length > 0 ? (
              posts.map((post: Post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userId={user?.id}
                  refetch={refetch}
                />
              ))
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
