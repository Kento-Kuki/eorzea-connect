import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import { signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const onSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  };

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4'>
        <Text>Profile</Text>
        <TouchableOpacity
          onPress={onSignOut}
          className='px-4 py-2 bg-primary w-[100px] rounded-lg'
        >
          <Text className='text-white'>Log out</Text>
        </TouchableOpacity>
        <Link href='/set-up' className='text-white'>
          Set up
        </Link>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Profile;
