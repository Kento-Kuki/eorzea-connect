import { View, Text } from 'react-native';
import React from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfile = () => {
  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4' edges={['top', 'left', 'right']}>
        <View>
          <Text className='font-psemibold text-3xl text-white'>
            Edit Profile
          </Text>
        </View>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default EditProfile;
