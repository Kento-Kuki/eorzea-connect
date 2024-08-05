import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundLayout from '@/components/BackgroundLayout';
import Info from '@/components/Info';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <BackgroundLayout>
      <SafeAreaView className='h-full mx-4'>
        <Info />
        <FlatList
          data={[{ $id: '1' }, { $id: '2' }, { $id: '3' }]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Text className='text-white'>{item.$id}</Text>
          )}
        />
      </SafeAreaView>
    </BackgroundLayout>
  );
};

export default Home;
