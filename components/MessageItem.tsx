import { View, Text } from 'react-native';
import React from 'react';
import { Message } from '../types/Chat';
import { User } from '@/types/User';

import { formatDate } from '@/lib/formatDate';

interface MessageItemProps {
  message: Message;
  opponent: User | null;
}

const MessageItem = ({ message, opponent }: MessageItemProps) => {
  const isOwnMessage = message.user.id !== opponent?.id;

  const formattedDate = formatDate(message.createdAt);
  return (
    <View
      key={message.id}
      className={`my-2 ${isOwnMessage ? 'self-end' : 'self-start'}`}
    >
      <View
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          isOwnMessage ? 'bg-[#54ebff]' : 'bg-white'
        }`}
      >
        <Text className='text-black text-base'>{message.content}</Text>
      </View>
      <Text
        className={`text-gray-400 text-xs mt-1 ${
          isOwnMessage ? 'text-right' : 'text-left'
        }`}
      >
        {formattedDate}
      </Text>
    </View>
  );
};

export default MessageItem;
