import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='confirm' options={{ headerShown: false }} />
    </Stack>
  );
};

export default CreateLayout;
