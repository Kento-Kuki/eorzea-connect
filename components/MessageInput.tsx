import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createMessage } from '@/lib/appwrite';
import { ChatRoomType } from '@/types/Chat';
import Toast from 'react-native-toast-message';

interface MessageInputProps {
  chatRoomId: string;
  userId: string;
  setChatRooms: (
    updateFn: (chatRooms: ChatRoomType[]) => ChatRoomType[]
  ) => void;
}

const MessageInput = ({
  chatRoomId,
  userId,
  setChatRooms,
}: MessageInputProps) => {
  const [value, setValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async () => {
    try {
      setIsSending(true);
      if (value.trim()) {
        const newMessage = await createMessage({
          chatRoomId,
          userId,
          content: value,
          isRead: false,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to sending message',
      });
    } finally {
      setValue('');
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-row items-center my-2'
    >
      <TextInput
        className='text-white text-base bg-gray-800 rounded-lg px-4 flex-1 flex justify-center min-h-[40px] border focus:border-primary'
        value={value}
        placeholder='Type a message...'
        placeholderTextColor='#9E9E9E'
        onChangeText={(text) => setValue(text)}
        multiline
      />

      <TouchableOpacity
        onPress={onSubmit}
        className='ml-2'
        disabled={isSending}
      >
        <FontAwesome name='send' size={28} color='#e0e0e0' />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
