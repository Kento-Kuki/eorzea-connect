import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {};
  return (
    <BackgroundLayout>
      <SafeAreaView className=''>
        <ScrollView>
          <View className='w-full justify-center min-h-[70vh] px-4 my-6'>
            <Image
              source={require('../../assets/images/logo_transparent1.png')}
              className='w-[200px] h-[60px]'
              resizeMode='contain'
            />
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
              Sign up to Eorzea Connect
            </Text>
            <FormField
              title='Username'
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles='mt-7'
              placeholder='Enter your username'
            />
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
              Sign Up
            </CustomButton>
            <View className=' justify-center pt-5 flex-row gap-2'>
              <Text className='text-white font-pregular text-lg'>
                Already have an account?
              </Text>
              <Link href='/sign-in' asChild>
                <Text className=' text-[#FF9C01] font-pregular text-lg'>
                  Log In
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default SignUp;
