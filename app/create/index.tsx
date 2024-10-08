import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { IPostForm, Post } from '@/types/Post';
import { Controller, useForm } from 'react-hook-form';

import { Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';

import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/validation/postSchema';
import { useAuthStore } from '@/store/useAuthStore';
import { usePostStore } from '@/store/usePostState';
import { FontAwesome } from '@expo/vector-icons';

const Create = () => {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const postData = usePostStore((state) => state.postData);
  const setPostData = usePostStore((state) => state.setPostData);

  if (!isLoggedIn || !user) return <Redirect href='/sign-in' />;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: postData?.title || '',
      content: postData?.content || '',
      author: postData?.author || user,
    },
  });

  const onSubmit = (data: IPostForm | Post) => {
    setPostData({ ...postData, ...data, author: user });
    router.push('/create/confirm');
  };
  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4 mb-6 mt-3 flex-1'>
        <View className='flex flex-row justify-between items-center mb-2'>
          <TouchableOpacity onPress={() => router.back()} className='w-8'>
            <FontAwesome name='angle-left' size={36} color='white' />
          </TouchableOpacity>
          <Text className='text-2xl text-white font-psemibold'>
            Create New Post
          </Text>
          <Image
            source={require('../../assets/images/logoIcon.png')}
            className='w-12 h-12'
            resizeMode='contain'
          />
        </View>

        <ScrollView
          className='h-full bg-secondary rounded-2xl space-y-5 mb-4'
          showsHorizontalScrollIndicator={false}
        >
          <Controller
            control={control}
            name='title'
            render={({ field: { onChange, value } }) => (
              <FormField
                title='Title'
                value={value}
                handleChangeText={onChange}
                otherStyles='mx-6 mt-4'
                inputStyles='bg-white border-white focus:border-black h-12'
                labelStyles='text-black font-psemibold'
                inputTextStyles='text-black font-pmedium'
                placeholder='Give your post a title...'
                error={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='content'
            render={({ field: { onChange, value } }) => (
              <FormField
                title='Comment'
                value={value}
                handleChangeText={onChange}
                otherStyles='mx-6 mt-2'
                inputStyles='bg-white border-white focus:border-black h-52'
                labelStyles='text-black font-psemibold'
                inputTextStyles='text-black font-pmedium h-52 py-3 text-base'
                placeholder='Give your post content...'
                multiline={true}
                error={errors.content?.message}
              />
            )}
          />

          <View className='bg-[#FFF0F0] border-2 border-[#FF8181] p-2 mx-6 mb-4 rounded-lg'>
            <Text className='font-pmedium text-[#FF8181]'>
              This site is for finding partners to enjoy games together.
              Requests for real-life meetings or monetary compensation are
              prohibited. Posts that don’t align with this purpose or involve
              malicious behavior are not allowed. Inappropriate posts may be
              removed without prior notice.
            </Text>
          </View>
        </ScrollView>
        <CustomButton onPress={handleSubmit(onSubmit)}>
          Preview Post
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Create;
