import { View, Text, Image } from 'react-native';
import React from 'react';
import { User } from '@/types/User';

interface AuthorInfoProps {
  author: User;
}

const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    <View className='flex flex-row space-x-4 justify-between items-center py-2 '>
      <View className='flex justify-center items-center space-y-2 w-1/3 flex-1'>
        <Image
          source={{ uri: author.avatar }}
          className='w-16 h-16 rounded-full'
          resizeMode='cover'
        />
        <View className='flex justify-center items-center'>
          <Text className='font-psemibold text-lg'>{author.username}</Text>
          <Text className='font-pmedium'>
            Age:{author.age === 'Prefer not to say' ? '?' : author.age}
          </Text>
          <Text className='font-pmedium'>
            Gender:
            {author.gender === 'Prefer not to say' ? '?' : author.gender}
          </Text>
        </View>
      </View>

      <View className='flex w-1/2'>
        <Text className='font-pmedium'>Server:{author.server}</Text>
        <Text className='font-pmedium'>
          Active Time:{author.activeTime?.join(', ')}
        </Text>
        <Text className='font-pmedium'>Race:{author.race}</Text>
        <Text className='font-pmedium'>Job:{author.job}</Text>
        <View>
          <Text className='font-pmedium'>Play Style:</Text>
          <View className='flex flex-row flex-wrap'>
            {author.playStyle?.map((item, index) => (
              <View
                key={index}
                className='bg-primary py-0.5 px-1.5 m-1 rounded-lg '
              >
                <Text className='text-white font-pmedium'>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AuthorInfo;
