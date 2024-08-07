import { Redirect, router } from 'expo-router';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import BackgroundLayout from '@/components/BackgroundLayout';
import { useGlobalContext } from '@/context/GlobalProvider';

const Welcome = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />;

  return (
    <BackgroundLayout>
      <SafeAreaView
        className='h-full'
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}
      >
        <ScrollView
          contentContainerStyle={{
            height: '100%',
          }}
        >
          <View className='w-full justify-center items-center min-h-[85vh] px-8'>
            <Image
              source={require('../assets/images/logo_transparent1.png')}
              className='w-full h-[70px]'
              resizeMode='contain'
            />
            {/* <Image
              source={require('../assets/images/logo_transparent2.png')}
              className='w-full'
              resizeMode='contain'
            /> */}
            <Image
              source={require('../assets/images/ff14PR.png')}
              className='max-w-[380px] w-full h-[180px]'
              resizeMode='contain'
            />
            <View className='w-full flex justify-center items-center mt-2 space-y-2'>
              <Text className='text-3xl text-white font-pbold text-center'>
                Find Your Eorzean Allies Now!
              </Text>
              <Text className='text-white font-pregular text-center'>
                Connect with adventurers and conquer Eorzea&apos;s challenges
                together.
              </Text>
            </View>
            <View className='w-full flex flex-row justify-center items-center mt-8'>
              <CustomButton
                containerStyles='px-4 py-2'
                onPress={() => router.push('/sign-in')}
              >
                Continue with Email
              </CustomButton>
            </View>
          </View>
        </ScrollView>
        <StatusBar style='light' backgroundColor='#161622' />
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Welcome;
