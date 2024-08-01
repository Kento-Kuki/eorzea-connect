import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appwrite';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);

      // set it to global state

      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <BackgroundLayout>
      <SafeAreaView className='flex-1'>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View className='w-full justify-center min-h-[70vh] px-4 my-6'>
            <Image
              source={require('../../assets/images/logo_transparent1.png')}
              className='w-[200px] h-[60px]'
              resizeMode='contain'
            />
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
              Log in to Eorzea Connect
            </Text>
            <FormField
              title='Email'
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles='mt-7'
              keyboardType='email-address'
              placeholder='Enter your email'
            />
            <FormField
              title='Password'
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles='mt-7'
              placeholder='Enter your password'
            />
            <CustomButton
              onPress={onSubmit}
              isLoading={isSubmitting}
              containerStyles='mt-10'
            >
              Log in
            </CustomButton>
            <View className=' justify-center pt-5 flex-row gap-2'>
              <Text className='text-white font-pregular text-lg'>
                Don&apos;t have an account?{' '}
              </Text>
              <Link href='/sign-up' asChild>
                <Text className=' text-[#FF9C01] font-pregular text-lg'>
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default SignIn;
