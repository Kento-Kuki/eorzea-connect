import { View, FlatList, Image, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, useLocalSearchParams } from 'expo-router';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/Post';
import EmptyState from '@/components/EmptyState';
import CustomButton from '@/components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { searchPosts } from '@/lib/appwrite';
import useAppwrite from '@/lib/useAppwrite';

const Result = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, loading } = useAppwrite(() =>
    searchPosts(query as string)
  );

  return (
    <BackgroundLayout>
      <SafeAreaView
        className='h-full mx-4 flex-1 relative'
        edges={['top', 'left', 'right']}
      >
        <FlatList
          data={loading ? [] : (posts as Post[])}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className='flex my-6 px-4 flex-row  items-center space-x-6'>
              <Link href='/search' asChild>
                <FontAwesome name='arrow-left' size={24} color='white' />
              </Link>
              <Text className='font-pmedium text-2xl text-white'>
                Search Results
              </Text>
            </View>
          )}
          ListEmptyComponent={() =>
            loading ? (
              <View className='h-full flex justify-center items-center mt-32'>
                <ActivityIndicator size='large' color='white' />
              </View>
            ) : (
              <EmptyState
                title='No Posts Found'
                subtitle='Be the first one to create a post'
              />
            )
          }
        />
        <CustomButton
          containerStyles='absolute bottom-2 right-2 w-14 h-14 rounded-full '
          onPress={() => router.push('/create')}
        >
          <FontAwesome name='plus' size={24} color='white' />
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Result;
