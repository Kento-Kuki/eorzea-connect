import { useForm, Controller } from 'react-hook-form';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import CheckBox from '@/components/CheckBox';
import { checkboxOptions } from '@/constants/checkbox';
import FormField from '@/components/FormField';
import Select from '@/components/Select';
import { selectData } from '@/constants/selectData';
import { IUserForm, SelectType } from '@/types/User';
import { updateUser } from '@/lib/appwrite';
import { router } from 'expo-router';
import { userSchema } from '@/validation/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/useAuthStore';
const SetUp = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user?.username || '',
      avatar: user?.avatar || '',
      age: '',
      gender: '',
      race: '',
      job: '',
      server: '',
      dataCenter: '',
      playStyle: [],
      activeTime: [],
    },
  });

  const [dcOptions, setDcOptions] = useState<SelectType[]>(
    selectData.servers.dataCenter
  );
  const [serverOptions, setServerOptions] = useState<SelectType[]>([]);

  const selectedDc = watch('dataCenter');

  useEffect(() => {
    if (selectedDc) {
      const servers = selectData.servers.server[selectedDc] || [];
      setServerOptions(servers);
    } else {
      setServerOptions([]);
    }
  }, [selectedDc]);

  const onSubmit = async (data: IUserForm) => {
    try {
      setIsSubmitting(true);
      if (!user) return;
      const updatedData = { ...data, isSetupComplete: true };
      await updateUser(user.id, updatedData);
      setUser({ ...user, ...updatedData });
      Alert.alert('Success', 'Account setup complete!');
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to set up account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4'>
        <View className='mt-10'>
          <Text className='text-white text-2xl font-pbold'>
            Let's get started with your account setup!
          </Text>
        </View>
        <ScrollView className='bg-secondary rounded-2xl my-4'>
          <View className='flex justify-center items-center space-y-4 w-full px-6 py-10'>
            <Text className='font-pbold text-3xl text-center'>
              User Details
            </Text>
            <Image
              source={{ uri: getValues('avatar') }}
              className='w-28 h-28 rounded-full'
              resizeMode='cover'
            />
            <View className='w-full'>
              <Controller
                control={control}
                name='username'
                render={({ field: { onChange, value } }) => (
                  <FormField
                    title='Username'
                    value={value}
                    handleChangeText={onChange}
                    otherStyles='space-y-1'
                    inputTextStyles='text-black'
                    inputStyles='w-[200px] h-10 rounded-lg bg-white border focus:border-black'
                    labelStyles='text-black font-pmedium'
                    placeholder='Username'
                    error={errors.username?.message}
                  />
                )}
              />
              <View className='w-full mt-2 flex flex-row items-center justify-center'>
                <Controller
                  control={control}
                  name='age'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      data={selectData.age}
                      title='Age'
                      value={value}
                      onChange={onChange}
                      containerStyle='w-1/2 mr-2'
                      placeholder='Select age'
                      error={errors.age?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name='gender'
                  render={({ field: { onChange, value } }) => (
                    <Select
                      data={selectData.gender}
                      title='Gender'
                      value={value}
                      onChange={onChange}
                      containerStyle='w-1/2'
                      placeholder='Select gender'
                      error={errors.gender?.message}
                    />
                  )}
                />
              </View>
            </View>
            <CheckBox
              title='Active Time'
              options={checkboxOptions.activeTime}
              value={getValues('activeTime') || []}
              onChange={(value) => setValue('activeTime', value)}
              error={errors.activeTime?.message}
            />
            <CheckBox
              title='Play Style'
              options={checkboxOptions.playStyle}
              value={getValues('playStyle') || []}
              onChange={(value) => setValue('playStyle', value)}
              error={errors.playStyle?.message}
            />
            <Text className='font-pbold text-3xl text-center'>
              Character Details
            </Text>
            <View className='w-full mt-2 flex flex-row items-center justify-center'>
              <Controller
                control={control}
                name='dataCenter'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={dcOptions}
                    title='DC'
                    value={value}
                    onChange={(value) => {
                      onChange(value);
                      setValue('server', '');
                    }}
                    containerStyle='w-1/2 mr-2'
                    placeholder='Select DC'
                    position='top'
                    error={errors.dataCenter?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='server'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={serverOptions}
                    title='Server'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2'
                    placeholder='Select server'
                    position='top'
                    error={errors.server?.message}
                  />
                )}
              />
            </View>
            <View className='w-full mt-2'>
              <Controller
                control={control}
                name='race'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={selectData.race}
                    title='Race'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2 mb-2'
                    placeholder='Select race'
                    position='top'
                    error={errors.race?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name='job'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={selectData.job}
                    title='Job'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2'
                    placeholder='Select job'
                    position='top'
                    error={errors.job?.message}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton isLoading={isSubmitting} onPress={handleSubmit(onSubmit)}>
          Save
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default SetUp;
