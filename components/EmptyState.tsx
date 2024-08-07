import { router } from 'expo-router';
import { View, Text, Image } from 'react-native';

import CustomButton from './CustomButton';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className='flex justify-center items-center px-4'>
      <Image
        source={require('../assets/images/empty.png')}
        resizeMode='contain'
        className='w-[270px] h-[216px]'
      />

      <Text className='text-xl text-center font-psemibold text-white mt-2'>
        {title}
      </Text>
      <Text className='text-sm font-pmedium text-gray-100'>{subtitle}</Text>

      <CustomButton
        onPress={() => router.push('/home')}
        containerStyles='w-full my-5 px-4'
      >
        Create Post
      </CustomButton>
    </View>
  );
};

export default EmptyState;
