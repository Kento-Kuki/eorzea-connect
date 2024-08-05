import { View, Text, Image } from 'react-native';
import React from 'react';
import { Post } from '@/types/Post';
import AuthorInfo from './AuthorInfo';
import { format } from 'date-fns';
import Separator from './Separator';
import CustomButton from './CustomButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <View className='bg-secondary rounded-2xl my-4 px-4'>
      // Title
      <View className='pt-4'>
        <Text className='font-psemibold text-lg text-center'>{post.title}</Text>
      </View>
      // Author
      <AuthorInfo author={post.author} />
      // Content
      <View>
        <Text className='font-pbold text-2xl text-center'>Comment</Text>
        <Separator />
        <View className='my-2'>
          <Text className='font-pmedium'>{post.content}</Text>
        </View>
      </View>
      // Button
      <View className='flex flex-row justify-between items-center mx-7 my-2'>
        <CustomButton containerStyles='px-4'>Send message</CustomButton>
        <CustomButton containerStyles='w-16'>
          <FontAwesome name='bookmark-o' size={22} color='white' />
        </CustomButton>
      </View>
      //Footer
      <View className='flex items-end p-2'>
        <Text className='text-xs text-gray-600 text-left'>
          Posted On:{format(new Date(post.updatedAt), 'yyyy-MM-dd HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default PostCard;
