import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Badge } from 'react-native-paper';
import { ChatRoomType } from '@/types/Chat';
import { router } from 'expo-router';
import { formatDate } from '@/lib/formatDate';

interface ChatItemProps {
  chatRoom: ChatRoomType;
  userId: string;
}
const ChatItem = ({ chatRoom, userId }: ChatItemProps) => {
  let isOwnMessage;
  let formattedDate;

  if (chatRoom.lastMessage) {
    isOwnMessage = userId === chatRoom.lastMessage.user.id;
    formattedDate = formatDate(chatRoom.lastMessage.createdAt);
  }

  return (
    <TouchableOpacity
      className='flex flex-row items-center space-x-4 my-2 pb-1'
      onPress={() => router.push(`/chat/${chatRoom.id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: chatRoom.opponent?.avatar }}
        className='w-10 h-10 rounded-full'
        resizeMode='contain'
      />
      <View className='flex flex-row justify-between items-center flex-1 border-b border-secondary relative'>
        <View className='pb-1 w-full'>
          <View className='flex flex-row items-center justify-between'>
            <Text className='text-white font-psemibold text-xl'>
              {chatRoom.opponent?.username}
            </Text>
            <Text className='text-white text-base'>{formattedDate}</Text>
          </View>
          <Text className='text-white text-base'>
            {chatRoom.lastMessage?.content}
          </Text>
        </View>

        <Badge
          size={10}
          style={{
            backgroundColor: 'skyblue',
            color: 'white',
            fontWeight: 'bold',
            position: 'absolute',
            right: 10,
            top: '60%',
          }}
          visible={
            isOwnMessage
              ? false
              : chatRoom.lastMessage
              ? !chatRoom.lastMessage?.isRead
              : false
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
