import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import FormField from '@/components/FormField';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/validation/passwordSchema';
import CustomButton from '@/components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updatePassword } from '@/lib/appwrite';

const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setIsSubmitting(true);
    try {
      if (data.newPassword !== data.confirmPassword)
        return Alert.alert('Error', 'Passwords do not match');
      await updatePassword(data.newPassword, data.currentPassword);
      Alert.alert('Success', 'Password updated successfully');
      router.replace('/profile');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4' edges={['top', 'left', 'right']}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          <View className='flex my-6 px-4 flex-row  items-center space-x-6'>
            <Link href='/profile' asChild>
              <FontAwesome name='arrow-left' size={24} color='white' />
            </Link>
            <Text className='font-pmedium text-2xl text-white'>
              Change Password
            </Text>
          </View>
          <View>
            <Text className='font-pmedium text-base text-white text-center'>
              Enter your current password and a new password to update your
              account.
            </Text>
            <View className='mb-12'>
              <Controller
                control={control}
                name='currentPassword'
                render={({ field: { onChange, value } }) => (
                  <FormField
                    title='Current Password'
                    value={value}
                    handleChangeText={onChange}
                    placeholder='Enter your current password'
                    error={errors.currentPassword?.message}
                    otherStyles='mt-7'
                  />
                )}
              />
              <Controller
                control={control}
                name='newPassword'
                render={({ field: { onChange, value } }) => (
                  <FormField
                    title='New Password'
                    value={value}
                    handleChangeText={onChange}
                    placeholder='Enter your new password'
                    error={errors.newPassword?.message}
                    otherStyles='mt-7'
                  />
                )}
              />
              <Controller
                control={control}
                name='confirmPassword'
                render={({ field: { onChange, value } }) => (
                  <FormField
                    title='Confirm Password'
                    value={value}
                    handleChangeText={onChange}
                    placeholder='Confirm your new password'
                    error={errors.confirmPassword?.message}
                    otherStyles='mt-7'
                  />
                )}
              />
            </View>

            <CustomButton
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            >
              Change Password
            </CustomButton>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default ChangePassword;
