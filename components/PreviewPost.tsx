import { View, Text } from 'react-native';

import { IPostForm, Post } from '@/types/Post';
import AuthorInfo from './AuthorInfo';

import Separator from './Separator';

interface PreviewPostProps {
  post: Post | IPostForm;
}

const PreviewPost = ({ post }: PreviewPostProps) => {
  return (
    <View className='bg-secondary rounded-2xl my-4 pl-4 pr-2'>
      {/* Title */}
      <View className='pt-2 flex-row justify-between'>
        <Text className='font-pbold text-xl flex-1'>{post.title}</Text>
      </View>
      {/* Author */}
      <AuthorInfo author={post.author} />
      {/* Content */}
      <View className='min-h-[200px]'>
        <Text className='font-pbold text-2xl text-center'>Comment</Text>
        <Separator />
        <View className='my-2'>
          <Text className='font-pmedium' selectable={true}>
            {post.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PreviewPost;
