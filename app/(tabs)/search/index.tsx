import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import BackgroundLayout from '@/components/BackgroundLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { ISearch, SelectType } from '@/types/User';
import { selectData } from '@/constants/selectData';
import Select from '@/components/Select';
import CheckBox from '@/components/CheckBox';
import { checkboxOptions } from '@/constants/checkbox';
import CustomButton from '@/components/CustomButton';
import Separator from '@/components/Separator';
import { router } from 'expo-router';

const Search = () => {
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<ISearch>({
      defaultValues: {
        age: null,
        gender: null,
        race: null,
        job: null,
        server: null,
        dataCenter: null,
        playStyle: null,
        activeTime: null,
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

  const onSubmit = (data: ISearch) => {
    const query = encodeURIComponent(JSON.stringify(data));
    router.push(`/search/${query}` as any);
  };

  return (
    <BackgroundLayout>
      <SafeAreaView
        className='h-full mx-4 mb-4 flex-1'
        edges={['top', 'left', 'right']}
      >
        <ScrollView className='bg-secondary rounded-2xl my-4'>
          <View className='flex justify-center items-center space-y-4 w-full px-6 py-10'>
            <Text className='font-pbold text-2xl text-center'>
              User Criteria
            </Text>
            <Separator />
            <View className='w-full mt-2 flex flex-row items-center justify-center'>
              <Controller
                control={control}
                name='age'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={[{ label: 'None', value: '' }, ...selectData.age]}
                    title='Age'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2 mr-2'
                    placeholder='Select age'
                  />
                )}
              />
              <Controller
                control={control}
                name='gender'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={[{ label: 'None', value: '' }, ...selectData.gender]}
                    title='Gender'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2'
                    placeholder='Select gender'
                  />
                )}
              />
            </View>
            <CheckBox
              title='Active Time'
              options={checkboxOptions.activeTime}
              value={getValues('activeTime') || []}
              onChange={(value) => setValue('activeTime', value)}
            />
            <CheckBox
              title='Play Style'
              options={checkboxOptions.playStyle}
              value={getValues('playStyle') || []}
              onChange={(value) => setValue('playStyle', value)}
            />
            <Text className='font-pbold text-2xl text-center'>
              Character Criteria
            </Text>
            <Separator />
            <View className='w-full mt-2 flex flex-row items-center justify-center'>
              <Controller
                control={control}
                name='dataCenter'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={[{ label: 'None', value: '' }, ...dcOptions]}
                    title='DC'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={(value) => {
                      onChange(value);
                      setValue('server', '');
                    }}
                    containerStyle='w-1/2 mr-2'
                    placeholder='Select DC'
                    position='top'
                  />
                )}
              />
              <Controller
                control={control}
                name='server'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={[{ label: 'None', value: '' }, ...serverOptions]}
                    title='Server'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2'
                    placeholder='Select server'
                    position='top'
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
                    data={[{ label: 'None', value: '' }, ...selectData.race]}
                    title='Race'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2 mb-2'
                    placeholder='Select race'
                    position='top'
                  />
                )}
              />
              <Controller
                control={control}
                name='job'
                render={({ field: { onChange, value } }) => (
                  <Select
                    data={[{ label: 'None', value: '' }, ...selectData.job]}
                    title='Job'
                    titleStyle='font-psemibold text-lg'
                    value={value}
                    onChange={onChange}
                    containerStyle='w-1/2'
                    placeholder='Select job'
                    position='top'
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton isLoading={false} onPress={handleSubmit(onSubmit)}>
          Search Posts
        </CustomButton>
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Search;
