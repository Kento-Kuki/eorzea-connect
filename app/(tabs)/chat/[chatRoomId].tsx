import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import useAppwrite from '@/lib/useAppwrite';
import {
  getChatRoomById,
  getMessages,
  markMessageAsRead,
} from '@/lib/appwrite';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthStore } from '@/store/useAuthStore';
import MessageInput from '@/components/MessageInput';
import MessageItem from '@/components/MessageItem';
import { useMessageStore } from '@/store/useMessageStore';

const ChatRoom = () => {
  const { chatRoomId } = useLocalSearchParams();
  const user = useAuthStore((state) => state.user);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setChatRooms = useMessageStore((state) => state.setChatRooms);
  const { loading } = useAppwrite({
    fetchFn: () => getMessages(chatRoomId as string),
    setFn: (newMessages) => setMessages(() => newMessages),
  });
  const { data, loading: chatRoomLoading } = useAppwrite({
    fetchFn: user
      ? () => getChatRoomById(chatRoomId as string, user?.id)
      : () => Promise.resolve(null),
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
    if (user && messages) {
      messages
        .filter((message) => message.user.id !== user.id && !message.isRead)
        .forEach(async (message) => {
          await markMessageAsRead(message.id);
          setChatRooms((chatRooms) =>
            chatRooms.map((chatRoom) =>
              chatRoom.id === chatRoomId
                ? {
                    ...chatRoom,
                    lastMessage: {
                      ...message,
                      isRead: true,
                    },
                  }
                : chatRoom
            )
          );
        });
    }
  }, [messages]);

  if (!user) return <Redirect href='/sign-in' />;

  if (loading || chatRoomLoading) {
    return (
      <BackgroundLayout>
        <SafeAreaView className='h-full mx-4'>
          <View className='flex-1 justify-center items-center'>
            <ActivityIndicator size='large' color={'white'} />
          </View>
        </SafeAreaView>
      </BackgroundLayout>
    );
  }

  if (!data || !data.opponent) return <Redirect href='/chat' />;

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4' edges={['top', 'left', 'right']}>
        <View className='flex flex-row items-center space-x-2 pb-3 border-b border-secondary'>
          <Link href='/chat' className='px-3'>
            <FontAwesome name='angle-left' size={40} color='white' />
          </Link>
          <View className='flex flex-row items-center space-x-4'>
            <Image
              source={{ uri: data.opponent.avatar }}
              className='w-10 h-10 rounded-full'
              resizeMode='contain'
            />
            <Text className='text-white font-pbold text-2xl'>
              {data.opponent.username}
            </Text>
          </View>
        </View>
        <ScrollView
          className='flex-1'
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
        >
          {messages?.map((item) => (
            <MessageItem
              key={item.id}
              message={item}
              opponent={data.opponent}
            />
          ))}
        </ScrollView>
        <MessageInput
          chatRoomId={chatRoomId as string}
          userId={user.id}
          setMessages={setMessages}
          setChatRooms={setChatRooms}
        />
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default ChatRoom;
