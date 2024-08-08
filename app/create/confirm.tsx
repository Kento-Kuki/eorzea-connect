import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Link, Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { FontAwesome } from '@expo/vector-icons';
import { createPost, updatePost } from '@/lib/appwrite';
import PreviewPost from '@/components/PreviewPost';
import { Post } from '@/types/Post';

const Confirm = () => {
  const { user, postData, setPostData, isLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;
  if (!postData) return <Redirect href='/create' />;
  const isUpdate = (data: any): data is Post => {
    return 'id' in data;
  };
  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (isUpdate(postData)) {
        await updatePost(postData);
        Alert.alert('Success', 'Post updated successfully');
      } else {
        await createPost(postData);
        Alert.alert('Success', 'Post created successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setPostData(null);
      setIsSubmitting(false);
      router.push('/home');
    }
  };

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full m-4'>
        <View className=' mt-4 px-4'>
          <Link href='/create' className='w-20'>
            <View className='flex flex-row items-center '>
              <FontAwesome name='angle-left' size={36} color='white' />
              <Text className='font-pmedium text-xl text-white ml-2'>Back</Text>
            </View>
          </Link>
        </View>
        <ScrollView
          className='rounded-2xl'
          showsVerticalScrollIndicator={false}
        >
          <PreviewPost post={postData} />
        </ScrollView>
        <CustomButton
          onPress={onSubmit}
          containerStyles='my-5'
          isLoading={isSubmitting}
        >
          Create Post
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Confirm;
