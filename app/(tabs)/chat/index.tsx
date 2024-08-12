import {
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatItem from '@/components/ChatItem';
import useAppwrite from '@/lib/useAppwrite';
import { getChatRooms } from '@/lib/appwrite';
import { useAuthStore } from '@/store/useAuthStore';
import { useMessageStore } from '@/store/useMessageStore';
import { Redirect } from 'expo-router';

const ChatList = () => {
  const user = useAuthStore((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const chatRooms = useMessageStore((state) => state.chatRooms);
  const setChatRooms = useMessageStore((state) => state.setChatRooms);
  const { loading, refetch } = useAppwrite({
    fetchFn: user ? () => getChatRooms(user?.id) : () => Promise.resolve([]),
    setFn: (newChatRooms) => setChatRooms(() => newChatRooms),
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading) {
    return (
      <BackgroundLayout>
        <SafeAreaView className='h-full mx-4'>
          <Image
            source={require('../../../assets/images/logo_transparent1.png')}
            className='w-full h-16'
            resizeMode='contain'
          />
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size='large' color={'white'} />
          </View>
        </SafeAreaView>
      </BackgroundLayout>
    );
  }

  if (!user) return <Redirect href='/sign-in' />;

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4'>
        <Image
          source={require('../../../assets/images/logo_transparent1.png')}
          className='w-full h-16'
          resizeMode='contain'
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {chatRooms?.map((item) => (
            <ChatItem key={item.id} chatRoom={item} userId={user.id} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default ChatList;
