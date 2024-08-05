import { View, Text, FlatList } from 'react-native';
import React from 'react';

const INFO = [
  {
    $id: '1',
    message: 'Fixed Layout',
    timestamp: '2022-02-01',
  },
  {
    $id: '2',
    message: 'Fixed server error',
    timestamp: '2022-01-25',
  },
  {
    $id: '3',
    message: 'Fixed server error',
    timestamp: '2022-01-25',
  },
  {
    $id: '4',
    message: 'Added new Job',
    timestamp: '2022-01-25',
  },
];

const Info = () => {
  return (
    <View className='mt-10 space-y-5'>
      <Text className='text-white font-psemibold text-4xl text-center'>
        Info
      </Text>
      <View className='bg-secondary rounded-2xl'>
        <FlatList
          data={INFO}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className='flex flex-row justify-between px-6 py-2 items-center'>
              <Text className='font-psemibold'>{item.timestamp}</Text>
              <Text className='font-psemibold'>{item.message}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Info;
