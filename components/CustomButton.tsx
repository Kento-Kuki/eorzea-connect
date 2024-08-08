import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  children,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-xl h-[62px] justify-center items-center relative ${containerStyles}`}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading}
    >
      <Text
        className={`text-white font-pbold text-lg ${textStyles} ${
          isLoading && 'opacity-0'
        }`}
      >
        {children}
      </Text>
      {isLoading && (
        <ActivityIndicator size='small' color='white' className='absolute' />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
